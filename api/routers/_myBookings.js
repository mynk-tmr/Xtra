import express from "express";
import { Listing } from "../models/_listing.js";
import { User } from "../models/_user.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import { handleInternalError, jsonResponse } from "../helpers/_formatters.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = user.bookings.map(({ id }) => id);
    const bookings = await Listing.find({ _id: { $in: list } });
    return jsonResponse(res, 200, bookings);
  } catch (err) {
    handleInternalError(res, err);
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const listing = await Listing.findById(req.body.assetId);
    if (!user || !listing || listing.userId == req.userId)
      //user can't book their own listing
      return jsonResponse(res, 400, "Bad request");
    const newBooking = {
      id: req.body.assetId,
      createdAt: Date.now(),
    };
    user.bookings.push(newBooking);
    await user.save();
    return jsonResponse(res, 201);
  } catch (err) {
    handleInternalError(res, err);
  }
});

export default router;
