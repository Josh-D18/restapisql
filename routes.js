const express = require("express");
const router = express.Router();
const { User, Course } = require("./models/index");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { authenticateUser } = require("./middleware/auth-user");
const bcrypt = require("bcrypt");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// setup a friendly greeting for the root route
router.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

//  User Routes

router.get(
  "/api/users",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const user = req.currentUser;
      res.json(req.body).status(200);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  })
);

router.post(
  "/api/users",
  jsonParser,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.location("/").status(201).json(user);
    } catch (error) {
      console.log(req.body);
      res.status(400).json({ message: error });
    }
  })
);

//  Course Routes

router.get(
  "/api/courses",
  asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll();
    res.json(courses).status(200);
  })
);

router.get(
  "/api/courses/:id",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    res.json(course).status(200);
  })
);

router.post(
  "/api/courses",
  jsonParser,
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const course = await Course.create(req.body);
      if (course.UserId == req.currentUser.dataValues.id) {
        res
          .status(201)
          .location("/api/courses/" + course.id)
          .end();
      } else {
        res.status(401).end();
        console.log(req.currentUser.dataValues.id, course);
      }
    } catch (err) {
      res.status(400);
    }
  })
);

router.put(
  "/api/courses/:id",
  jsonParser,
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (course.UserId == req.currentUser.dataValues.id) {
        course.update(req.body);
        res.status(204).end();
      } else {
        console.log(req.currentUser.dataValues.id, course);
        res.status(401).end();
      }
    } catch (err) {
      res.status(400).json({ message: err });
    }
  })
);

router.delete(
  "/api/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    course.destroy();
    res.status(204).end();
  })
);

module.exports = router;
