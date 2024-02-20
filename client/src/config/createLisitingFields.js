//PRO TIP
//copy your model schema (in db) and just stringify names
//this ensures we don't run into key mismatch errors

export default {
  description: "description",
  entranceWidth: "entranceWidth",
  entranceHeight: "entranceHeight" /* entraceDimensions = [w,h] */,
  storageSpace: "storageSpace",
  pricePerDay: "pricePerDay",
  discount: "discount",
  state: "state",
  city: "city",
  pincode: "pincode",
  locality: "locality",
  type: "type",
  facilities: "facilities",
  listingImages: "listingImages",
  starRating: "starRating",
};

export const facilitiesArray = [
  "Guarded Area",
  "Fire Protection",
  "Separate Access",
  "Pest Control",
  "Security Cameras",
  "Climate Control",
  "Cold Storage",
  "E-LockSystem",
];

export const typesArray = [
  { text: "Residential", hint: "good for household items" },
  { text: "Commercial", hint: "good for business inventory" },
  { text: "Both" },
];
