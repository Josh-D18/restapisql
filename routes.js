"use strict";
const express = require("express");
const router = express.Router();
const { User, Course } = require("./models/index");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { authenticateUser } = require("./middleware/auth-user");

// Helper Function
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

// Get all Users
router.get(
  "/api/users",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const users = await User.findAll({ where: { id: req.currentUser.id } });
      res.json(users).status(200);
    } catch (err) {
      res.status(400).json({ message: err.errors[0].message });
    }
  })
);

// Create a User
router.post(
  "/api/users",
  jsonParser,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.location("/").status(201).json();
    } catch (err) {
      let errors = [];
      for (let i = 0; i < err.errors.length; i++) {
        errors.push(err.errors[i].message);
      }
      res.status(400).json({ message: errors });
    }
  })
);

//  Course Routes

// Get all courses
router.get(
  "/api/courses",
  asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll({ include: [{ model: User }] });
    res.json(courses).status(200);
  })
);

// Get single course
router.get(
  "/api/courses/:id",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    res.json(course).status(200);
  })
);

// Add a course
router.post(
  "/api/courses",
  jsonParser,
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const course = await Course.create({
        ...req.body,
        userId: req.currentUser.id,
      });
      res
        .status(201)
        .location("/api/courses/" + course.id)
        .end();
    } catch (err) {
      let errors = [];
      for (let i = 0; i < err.errors.length; i++) {
        errors.push(err.errors[i].message);
      }
      res.status(400).json({ message: errors });
    }
  })
);

// Update Course
router.put(
  "/api/courses/:id",
  jsonParser,
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (course.userId == req.currentUser.dataValues.id) {
      Course.update(
        {
          ...req.body,
        },
        { where: { id: req.params.id } }
      )
        .then(() => {
          res.status(204).end();
        })
        .catch((err) => {
          let errors = [];
          for (let i = 0; i < err.errors.length; i++) {
            errors.push(err.errors[i].message);
          }
          res.status(400).json({ message: errors });
        });
    } else {
      res.status(400).json({ message: "This Is Not Your Course!" });
    }
  })
);

// Delete a course
router.delete(
  "/api/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const course = await Course.findByPk(req.params.id);
      course.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ message: "error deleting course" });
    }
  })
);

module.exports = router;
