import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { cookies } = req;
  if (!cookies || !cookies.token) {
    return res.status(401).json({ message: "Authentication invalid" });
  }

  try {
    const { userId, role } = verifyJWT(cookies.token);
    req.user = { userId, role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication invalid" });
  }
};

export const authorizedPermissionsSettings = (roles) => {
  return (req, res, next) => {
    console.log(req.user.role);

    if (req.user.role !== roles) {
      throw new UnauthorizedError("Unauthorized to access this setting");
    }
    next();
  };
};
