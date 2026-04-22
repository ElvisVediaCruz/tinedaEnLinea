import jwt from "jsonwebtoken";
import fs from "fs";

const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, "utf-8");

export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({ message: "Token not provided" });
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Invalid token format" });
    const token = parts[1];
    try {
        const payload = jwt.verify(token, publicKey);
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Token not valid" });
    }
}