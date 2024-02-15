import express from "express";
import { formDataParser, uploadFiles } from "../middlewares/_cloudinary.js";
import { Listing } from "../models/_myListing.js";
import { validationsAtCreateListing } from "../middlewares/_validator.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import { handleInternalError, jsonResponse } from "../helpers/_formatters.js";

const router = express.Router();
router.post(
  "/create-new",
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
      const listing = new Listing(listingData);
      await listing.save();
      return jsonResponse(res, 201, listing);
    } catch (err) {
      return handleInternalError(res, err);
    }
  }
);

router.get("/", verifyToken, async (req, res) => {
  try {
    const listing = await Listing.find({ userId: req.userId });
    return jsonResponse(res, 200, listing);
  } catch (err) {
    return handleInternalError(res, err);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id.toString();
  try {
    const listing = await Listing.findOne({ userId: req.userId, _id: id });
    return jsonResponse(res, 200, listing);
  } catch (err) {
    return handleInternalError(res, err);
  }
});

export default router;
