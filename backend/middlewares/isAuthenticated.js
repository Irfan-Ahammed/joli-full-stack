import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false
    });
  }
};

export default isAuthenticated;
