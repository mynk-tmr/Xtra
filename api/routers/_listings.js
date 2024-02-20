import express from "express";
import { Listing } from "../models/_myListing.js";
import { handleInternalError, jsonResponse } from "../helpers/_formatters.js";
import q2m from "query-to-mongo";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    let query = q2m(req.query);
    //e.g. ?limit=1&offset=0&facilities:all=Guarded Area,Fire Protection
    //criteria : {$all : ["Guar..", "Fir.."] } , options: {skip:0, limit:1}
    console.log(query);
    let count = await Listing.countDocuments(query.criteria);

    let data = await Listing.find(query.criteria)
      .sort(query.options.sort)
      .skip(query.options.skip)
      .limit(query.options.limit);

    res.links(query.links("", count)); //inserts Links headers for pagination
    return jsonResponse(res, 200, data);
  } catch (err) {
    return handleInternalError(res, err);
  }
});

export default router;
