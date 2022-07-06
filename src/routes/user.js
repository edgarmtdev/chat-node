import { Router } from "express";

export default function user(app) {
  const router = Router();
  app.use("/api/users", router);

  router.get("/", (req, res) => {
    return res.json({ hi: "world" });
  });
}
