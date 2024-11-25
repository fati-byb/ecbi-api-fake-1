
const checkIfAdmin = (req, res, next)=>{ 
    if(req.user.role === 'ROLE_ADMIN') next();
    else {
        const err = new Error('Access Denied');
        err.status = 403;
        next(err);
    }
}

module.exports = checkIfAdmin;