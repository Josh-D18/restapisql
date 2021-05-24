const express = require('express');
const router = express.Router();
const models = require('./models/index');


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
    const users = await models.User.findAll();
    res.json(users).status(200)
}));


router.post('/api/users', asyncHandler(async(req, res, next) => {

}));


//  Course Routes

router.get('/api/courses', asyncHandler(async(req, res, next) => {


}));



router.get('/api/courses/:id', asyncHandler(async(req, res, next) => {
    

}));

router.post('/api/courses', asyncHandler(async(req, res, next) => {
    

}));

router.put('/api/courses', asyncHandler(async(req, res, next) => {
    

}));

router.delete('/api/courses', asyncHandler(async(req, res, next) => {
    

}));







module.exports = router;