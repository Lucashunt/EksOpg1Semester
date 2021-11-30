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

/*
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
*/