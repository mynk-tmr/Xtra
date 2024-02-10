import express from "express";
import { formDataParser, uploadFiles } from "../middlewares/_cloudinary.js";
import { createListing } from "../models/_myListing.js";
import {
  errorResponse,
  validationsAtCreateListing,
} from "../middlewares/_validator.js";
import { verifyToken } from "../middlewares/_verifyToken.js";

const router = express.Router();
router.post(
  "/",
  verifyToken,
  validationsAtCreateListing,
  formDataParser.array("listingImages", 6),
  async (req, res) => {
    try {
      const listingData = req.body;
      listingData.imageUrls = await uploadFiles(req.files);
      listingData.lastUpdated = new Date();
      listingData.userId = req.userId;
      const listing = createListing(listingData);
      await listing.save();
    } catch (err) {
      console.log(err);
      return errorResponse(res, 500, "Something went wrong.");
    }
  }
);

export default router;
