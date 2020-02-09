var arrBlacklistToken = []
function checkBlacklistToken(req,res,next) {
    let token = req.cookies.token
    if (arrBlacklistToken.includes(token)) {
        res.json({
            status: 405,
            message: 'token has been blacklist'
        })
    } else {
        next()
    }
}



module.exports = {
    checkBlacklistToken,
    arrBlacklistToken
}