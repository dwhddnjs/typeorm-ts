import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Response, Request } from "express";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import postRoute from "./routes/post";

const app = express();
const PORT = 4000;

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

// MYSQL 연결
AppDataSource.initialize()
  .then(() => {
    console.log("DB연결 완료");
  })
  .catch((error) => console.log(error));

// 4000포트 서버 실행
app.listen(PORT, () => {
  console.log(`${PORT}로 서버 실행중입니다`);
});
