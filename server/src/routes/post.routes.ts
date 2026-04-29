import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  deletePostImages,
} from "../controller/post.controller";
import { uploadImages } from "../middleware/upload";

const router = Router();

router.post("/", uploadImages, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", uploadImages, updatePost);
router.delete("/:id", uploadImages, deletePost);
router.delete("/:id/images", uploadImages, deletePostImages);

export default router;
