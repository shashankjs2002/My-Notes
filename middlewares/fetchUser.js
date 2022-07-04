const jwt = require('jsonwebtoken')
const JWT_SECRET = '!@#$%'

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "Unauthorized user"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).send({error : "Unauthorized user"})
    }
}

module.exports = fetchUser