const express = require("express");
const router = express.Router();
const { createTasks, createTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middlewares");

// Routes beginning with /api/tasks
router.get("/", verifyAccessToken, createTasks);
router.get("/:taskId", verifyAccessToken, createTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:taskId", verifyAccessToken, putTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;
