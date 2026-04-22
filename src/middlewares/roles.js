

export const isAdmin = (req, res, next)=>{
    if(!req.user){
        return res.status(401).json({
            success: false,
            error: "User not authenticated"
        });
    }
    if (req.user.type !== "admin") {
        return res.status(403).json({
            success: false,
            error: "Access denied"
        });
    }
    next();
}
 