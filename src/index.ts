import { User } from "./entity/User";
import { AppDataSource } from "./data-source";
import * as express from "express";

const app = express();

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    user.email = "syd1215no@naver.com";
    user.password = "a102030a";
    await AppDataSource.manager.save(user);

    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    app.listen(() => {
      console.log("서버 실행중입니다");
    });
  })
  .catch((error) => console.log(error));
