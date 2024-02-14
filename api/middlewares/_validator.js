import { validationResult, body } from "express-validator";

/* Express Validator keeps validation separate from models, so
  - models are more maintable
  - reusable validations that can scale to any complexity or database type
  - fewer database calls */

export function getValidationErrors(req) {
  const errors = validationResult(req);
  return errors.isEmpty() ? null : errors.array(); //of error objects
}

export const validationsAtRegister = [
  //body creates a middleware to test a field in req.body
  body("email", "missing email").isEmail(),
  body("password", "Password atleast of 6 length").isLength({ min: 6 }),
  body("firstName", "missing firstName").notEmpty(),
  body("lastName", "missing lastName").notEmpty(),
];

export const validationsAtLogin = [
  validationsAtRegister[0],
  validationsAtRegister[1],
];

export const validationsAtCreateListing = [
  //body creates a middleware to test a field in req.body
  body("state", "invalid state").notEmpty(),
  body("city", "invalid city").notEmpty(),
  body("pincode", "invalid pincode").isInt({ min: 100000, max: 999999 }),
  body("locality", "invalid locality").notEmpty(),
  body("type", "invalid type").notEmpty(),
  body("description", "invalid description").isLength({ min: 20 }),
  body("facilities", "invalid facilities").isArray(),
  body("pricePerDay", "invalid pricePerDay").isInt({ min: 1 }),
  body("discount", "invalid discount").isInt({ min: 0 }),
  body("entranceWidth", "invalid entranceWidth").isInt({ min: 1 }),
  body("entranceHeight", "invalid entranceHeight").isInt({ min: 1 }),
  body("storageSpace", "invalid storageSpace").isFloat({ min: 0 }),
];
