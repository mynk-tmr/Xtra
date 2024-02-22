import express from "express";
import { Listing } from "../models/_listing.js";
import { handleInternalError, jsonResponse } from "../helpers/_formatters.js";
import q2m from "query-to-mongo";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    let query = q2m(req.query);
    //e.g. ?limit=1&offset=0&facilities:all=Guarded Area,Fire Protection
    //criteria : {$all : ["Guar..", "Fir.."] } , options: {skip:0, limit:1}
    query.options.skip ??= 0;
    query.options.limit ??= 3;

    let count = await Listing.countDocuments(query.criteria);

    let data = await Listing.find(query.criteria)
      .sort(query.options.sort)
      .skip(query.options.skip)
      .limit(query.options.limit);

    if (count) res.links(query.links("", count)); //auto gen pagination links
    return jsonResponse(res, 200, data);
  } catch (err) {
    return handleInternalError(res, err);
  }
});

export default router;
