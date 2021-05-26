const auth = require('basic-auth');
const {User, Course} = require('../models/index');
const bcrypt = require('bcrypt');

// Middleware to authenticate the request using Basic Auth.
exports.authenticateUser = async (req, res, next) => {
  // TODO
    const credentials = auth(req);
    let message;

    if (credentials) {
        const user = await User.findOne({ where: {firstName: credentials.firstName} });
        if (user) {
            const authenticated = bcrypt
            .compareSync(credentials.pass, user.confirmedPassword);
            if (authenticated) {
            req.currentUser = user;
            } else {
            message = `Authentication failure for name: ${user.firstname}`;
            }
        } else {
            message = `User not found for name: ${credentials.name}`;
        }
        } else {
        message = 'Auth header not found';
    }

    
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
}