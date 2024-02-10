import mongoose from "mongoose";

const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };
const requiredDate = { type: Date, required: true };

const listingSchema = new mongoose.Schema({
  userId: requiredString,
  state: requiredString,
  city: requiredString,
  pincode: requiredNumber,
  locality: requiredString,
  type: requiredString,
  description: requiredString,
  facilities: [requiredString],
  pricePerDay: requiredNumber,
  discount: requiredNumber,
  entraceDimensions: [requiredNumber],
  storageSpace: requiredNumber,
  starRating: { ...requiredNumber, min: 1, max: 5 },
  imageUrls: [requiredString],
  lastUpdated: requiredDate,
});

// listings collection in db
const Listing = mongoose.model("Listing", listingSchema);

function createListing(listingData) {
  return new Listing(listingData);
}

export { Listing, createListing };
