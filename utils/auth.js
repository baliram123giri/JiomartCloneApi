const { verify, sign } = require("jsonwebtoken")

function genarateToken(data) {
    const token = sign(data, process.env.JWT_KEY, {
        expiresIn: "24h"
    })
    return token
}

function cookieStore(res, token, maxAge = 24 * 60 * 60 * 1000) {
    res.cookie("token", token, { maxAge })
}

function authorization(req, res, next) {
    try {
        let token = req.headers.cookie
        if (!token) return res.status(500).json({ messsage: "Token is missing" })
        token = token?.split("=")[1]

        //verify that the token
        const tokenData = verify(token, process.env.JWT_KEY)
        if (!tokenData) return res.status(500).json({ messsage: "Invalid token" })
        res.userId = tokenData.id
        res.role = tokenData.role
        //refresh the authorization
        const newToken = genarateToken({ id: tokenData.id, role: tokenData.role })
        cookieStore(res, newToken)

        next()
    } catch (error) {
        res.status(500).json({ message: `${error.name} ${error.message}` })
    }

}

module.exports = { authorization, genarateToken, cookieStore }