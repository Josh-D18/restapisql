const auth = require("basic-auth");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");

// Middleware to authenticate the request using Basic Auth.
exports.authenticateUser = async (req, res, next) => {
  // TODO
  const credentials = auth(req);
  let message;

  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    if (user) {
      const authenticated = await bcrypt.compareSync(
        credentials.pass,
        user.password
      );
      if (authenticated) {
        req.currentUser = user;
      } else {
        message = `Authentication failure for name: ${credentials.name}`;
      }
    } else {
      message = `User not found for name: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
