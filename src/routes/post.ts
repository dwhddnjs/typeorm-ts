import express from "express";
import { auth } from "./verifyToken";

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json({
    posts: [
      { name: "g70", brand: "제네시스" },
      { name: "k9", brand: "기아" },
      { name: "그랜져", brand: "현대" },
    ],
  });
});

export default router;
