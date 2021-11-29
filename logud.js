const Profile = require('./Models/model')

const checkUser = (req,res,next) =>{
    const found = req.cookies.username

    if(found){
        const cookies = req.cookies
        let user = req.cookies.username
        res.locals.user = user;
        next();
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {checkUser}