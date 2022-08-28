const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")

const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }

    const token = jwt.sign({
        id: Math.random().toString(36)
    }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return res.status(200).json({
        message: "Login successfully",
        token,
        type: 'Bearer'
    })
}

const dashboard = async (req, res) => {
    const randomNum = Math.floor(Math.random() * 100);
    return res.status(200).json({
        ...req.user,
        message: randomNum
    })
}

module.exports = { login, dashboard }