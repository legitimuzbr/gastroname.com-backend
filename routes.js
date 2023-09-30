import { Router } from "express";
import { storage } from "./multerConfig.js";
import { PrismaClient } from '@prisma/client'
import multer from "multer";

import UserController from "./controllers/UserController.js";
import ItemController from "./controllers/ItemController.js";

const db = new PrismaClient()

const upload = multer({storage: storage})
const router = Router();

const userController = new UserController;
const itemController = new ItemController;

router.get("/getUsers", userController.getAll);

router.post("/addUser", userController.add);

router.get("/getItemsByUserId", itemController.getItemsByUserId);

router.post("/addItem", upload.single("image"), itemController.add);

export default router;