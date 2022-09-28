import express from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { loginValidation, registerValidation } from "../validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await userRepository.findOneBy({
    email: email,
  });
  if (emailExist) return res.status(400).send("해당 이메일이 이미 존재합니다");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User();
  user.email = email;
  user.name = name;
  user.password = hashedPassword;

  try {
    await userRepository.save(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) return res.status(400).send("이메일이 존재하지 않습니다");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("패스워드가 틀렸습니다");

  //jwt 토큰만들기
  const token = jwt.sign({ _id: user.id }, "asdzxcasdzxcasdzxc");
  res.header("auth-token", token).status(200).send(token);
});

export default router;
