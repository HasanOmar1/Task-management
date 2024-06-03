import jwt from "jsonwebtoken";
import STATUS_CODE from "../constants/statusCodes.js";
import db from "../database.js";
const protect = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader &&
            typeof authHeader === "string" &&
            authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "secret");
                if (typeof decoded === "object" && "userId" in decoded) {
                    const getUserQuery = "SELECT userId,name,email FROM users WHERE userId = ?";
                    const [user] = await db
                        .promise()
                        .query(getUserQuery, decoded.userId);
                    req.user = user[0];
                    next();
                }
            }
            catch (error) {
                console.error("Token Verification error: " + error);
                res
                    .status(STATUS_CODE.FORBIDDEN)
                    .send("You must be logged in to do this action");
            }
        }
        if (!token) {
            res.status(STATUS_CODE.FORBIDDEN);
            throw new Error("You must be logged in to do this action");
        }
    }
    catch (error) {
        next(error);
    }
};
export default protect;
