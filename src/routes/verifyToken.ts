import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("접근이 불가능합니다");

  try {
    const verified = jwt.verify(token, "asdzxcasdzxcasdzxc");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("유효 하지않는 토큰입니다");
  }
};
