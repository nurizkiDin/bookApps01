// checkRole('admin')

const checkRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Error forbidden role" });
        }
        next();
    }
}

// export default checkRole;
module.exports = checkRole;
