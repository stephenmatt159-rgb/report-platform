import multer from "multer";

export const upload = multer({ storage: multer.memoryStorage() });
export const uploadImages = multer({ storage: multer.memoryStorage() }).array(
  "images",
  5
); // Limit to 5 images
export const uploadSingleImage = multer({
  storage: multer.memoryStorage(),
}).single("image"); // For single image upload
