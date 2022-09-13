import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import { Response, Request } from "express";
import express = require("express");
import * as cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/users", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

app.post("/signup", async (req: Request, res: Response) => {
  const user = new User();
  const { email, password } = req.body;
  user.email = email;
  user.password = password;

  const users = await AppDataSource.getRepository(User).save(user);
});

app.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await AppDataSource.getRepository(User).findOneBy({
    email: email,
    password: password,
  });
  if (user) {
    return res.send("유저가 존재합니다");
  } else {
    return res.send("아디 비번이 틀립니다");
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB연결 완료");
  })
  .catch((error) => console.log(error));

app.listen(4000, () => {
  console.log("서버 실행중입니다");
});
