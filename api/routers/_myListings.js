import express from "express";
import { formDataParser, uploadFiles } from "../middlewares/_cloudinary.js";
import { createListing } from "../models/_myListing.js";
import { validationsAtCreateListing } from "../middlewares/_validator.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import { jsonResponse } from "../helpers/_formatters.js";

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
      listingData.starRating = 1;
      const listing = createListing(listingData);
      await listing.save();
      return jsonResponse(res, 201, listing);
    } catch (err) {
      console.log(err);
      return jsonResponse(res, 500, "Something went wrong.");
    }
  }
);

export default router;
