const jwt = require('jsonwebtoken');
const CustomAPIError = require("../errors/custom-error");

const auth = async (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer')) {
        throw new CustomAPIError("No token provided.", 401)
    }

    const token = auth.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decode.id }
        next()
    } catch (error) {
        throw new CustomAPIError('Unauthorized', 401)
    }
}

module.exports = auth