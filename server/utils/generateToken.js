import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none", // 'none' for prod, 'lax' for dev
      secure: true, // true for prod, false for dev
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      // domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined, // Uncomment and set for subdomain usage
    }).json({
        success:true,
        message,
        user
    });
};
