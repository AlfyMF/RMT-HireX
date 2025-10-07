import { Router } from "express";

const router = Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "API v1" });
});

// Add more routes here
// router.use("/requisitions", requisitionRoutes);

export default router;
