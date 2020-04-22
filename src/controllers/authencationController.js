const User = require('../models/user');

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
