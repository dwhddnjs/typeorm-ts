import { User } from "./entity/User";
import { createUser } from "./createUser";
import { AppDataSource } from "./data-source";
import * as express from "express";

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
    // await createUser().catch((error) => console.log(error))
  })
  .catch((error) => console.log(error));

app.listen(() => {
  console.log("서버 실행중입니다");
});
