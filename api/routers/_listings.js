import express from "express";
import { Listing } from "../models/_myListing.js";
import { handleInternalError, jsonResponse } from "../helpers/_formatters.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    let pageSize = 10;
    let pageNum = req.query.page?.toString() ?? 1;
    let skip = (pageNum - 1) * pageSize;
    let total = await Listing.countDocuments();
    let data = await Listing.find().skip(skip).limit(pageSize);
    return jsonResponse(res, 200, {
      data,
      pageNum,
      pages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    return handleInternalError(res, err);
  }
});

export default router;
