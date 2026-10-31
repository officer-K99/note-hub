import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  login,
  logout,
  register,
  me,
  refresh,
} from "../controllers/auth.controllers";
import { requireAuth } from "../middleware/auth";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
});
const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", requireAuth, me);

export default router;
