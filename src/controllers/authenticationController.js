const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.Login = async (req, res) => {
    

    try {
        const { email, password } = req.body;
        if (!email && !password) throw new Error("Email and password are required");

        const user = await User.loginWithCredentials(email, password )

        const token = await user.generateToken()

        res.status(200).json({ status: "success", data: token });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    };
};


exports.auth = async (req, res, next) => {
    // make sure we get the token
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
  
      console.log(req.headers.authorization);
    // verify token  
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    try {
      const decoded = jwt.verify(token, "Top Secret");
      console.log(decoded);
      // find User with token 
      const user = await User.findOne({ _id: decoded.id, token: token });
      if (!user) throw new Error("Unauthorized");
  
      // attach user object to req object
      req.user = user;
    } catch (err) {
      return res.status(401).json({ status: "fail", message: err.message });
    };
    next();
  };