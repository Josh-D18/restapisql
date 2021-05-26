const express = require('express');
const router = express.Router();
const {User, Course} = require('./models/index');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const { authenticateUser } = require('./middleware/auth-user');

function asyncHandler(cb){
    return async(req, res, next) => {
    try {
        await cb(req, res, next)
    } catch(error){
        next(error);
        }
    }
}

// setup a friendly greeting for the root route
router.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
})

//  User Routes

router.get('/api/users', authenticateUser, asyncHandler( async (req, res, next) => {
    const users = await User.findAll();
    res.json(users).status(200)
}));


router.post('/api/users', jsonParser, asyncHandler(async(req, res, next) => {
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
    })
    res.location('/').status(201)
}));


//  Course Routes

router.get('/api/courses', asyncHandler(async(req, res, next) => {
    const courses = await Course.findAll();
    res.json(courses).status(200);
}));



router.get('/api/courses/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    res.json(course).status(200);
}));


router.post('/api/courses', jsonParser, authenticateUser, asyncHandler(async(req, res, next) => {
    console.log(req.body)
    const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
    })
    res.location('/api/courses' + course.id).status(201)
}));

router.put('/api/courses/:id', jsonParser, authenticateUser, asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    course.update({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
    }).status(204)

}));

router.delete('/api/courses/:id', authenticateUser, asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    course.destroy();
}));







module.exports = router;