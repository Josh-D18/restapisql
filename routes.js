const express = require('express');
const router = express.Router();
const {User, Course} = require('./models/index');


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

router.get('/api/users', asyncHandler( async (req, res, next) => {
    const users = await User.findAll();
    res.json(users).status(200)
}));


router.post('/api/users', asyncHandler(async(req, res, next) => {
    
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

router.post('/api/courses', asyncHandler(async(req, res, next) => {
    

}));

router.put('/api/courses/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    course.update({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
    }).status(204)

}));

router.delete('/api/courses', asyncHandler(async(req, res, next) => {
    

}));







module.exports = router;