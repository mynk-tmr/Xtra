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
  try {
    const id = req.params.id.toString();
    const listing = await Listing.findOne({ userId: req.userId, _id: id });
    return jsonResponse(res, 200, listing);
  } catch (err) {
    return handleInternalError(res, err);
  }
});

router.put(
  "/:id",
  verifyToken,
  validationsAtCreateListing,
  formDataParser.array("listingImages", 6),
  async (req, res) => {
    try {
      const listingData = req.body;
      let listing = await Listing.findOneAndUpdate(
        {
          //filters
          _id: req.params.id.toString(),
          userId: req.userId,
        },
        listingData, //update (uses merge strategy)
        { new: true } //return updated one
      );

      if (!listing) return jsonResponse(res, 404, "No such listing is present");

      let newImgUrls = await uploadFiles(req.files);
      listing.imageUrls = [...newImgUrls, ...listingData.imageUrls];
      listing.lastUpdated = new Date();
      await listing.save();
      return jsonResponse(res, 201, listing);
    } catch (err) {
      return handleInternalError(res, err);
    }
  }
);

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Listing.findOneAndDelete({
      _id: req.params.id.toString(),
      userId: req.userId,
    });
    res.sendStatus(204);
  } catch (err) {
    return handleInternalError(res, err);
  }
});

export default router;
