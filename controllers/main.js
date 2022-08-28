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
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer')) {
        throw new CustomAPIError('No Token', 401)
    }

    const token = auth.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const randomNum = Math.floor(Math.random() * 100);
        return res.status(200).json({
            ...decode,
            message: randomNum
        })
    } catch (error) {
        throw new CustomAPIError('Unauthorized', 401)
    }

}

module.exports = { login, dashboard }