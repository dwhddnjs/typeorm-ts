import express from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { registerValidation } from "../validation";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  //회원생성 전 유효성검사
  const { email, name, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //회원이 존재하는지 확인하기
  const emailExist = await userRepository.findOneBy({
    email: email,
  });
  if (emailExist) return res.status(400).send("해당 이메일이 이미 존재합니다");

  //패스워드 암호화
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //회원생성
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

router.get("/login", (req, res) => {
  res.send("로그인중입니다");
  //4900
});

export default router;
