import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));

    console.log(user);

    if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

    const token = createJWT({
      userId: user._id,
      role: user.role,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "development",
    });

    res.status(StatusCodes.OK).json({
      msg: "user logged in",
      token,
      user: {
        id: user._id,
        role: user.role,
        username: user.username,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export { login, logout };
