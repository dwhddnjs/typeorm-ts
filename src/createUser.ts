import { getRepository } from "typeorm";
import { User } from "./entity/User";

export const createUser = async () => {
  const userRepo = getRepository(User);
  const newUser = userRepo.create({
    firstName: "jong",
    lastName: "LEE",
    age: 22,
  });
  await userRepo.save(newUser).catch((error) => {
    console.log(error);
  });
  console.log("saved it", newUser);
};
