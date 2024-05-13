const authenticator = require("../middleware/authenticator");
const controller = require("../controllers/onboarding");
const express = require("express");
const router = express.Router();
// const sanitizer = require("../sanitizers/onboarding");
// const validator = require("../validators/onboarding");
///////////////////////for sending otp
router.post(
  '/create',
  // authenticator.authenticate,
  // validator.validateCreate,
  // sanitizer.sanitizeCreate,
  controller.create
);

router.get(
  '/GetUsers',
  // authenticator.authenticate,
  // validator.validateCreate,
  // sanitizer.sanitizeCreate,
  controller.reed_all_users
);

router.get(
  '/logout',
  // authenticator.authenticate,
  // validator.validateCreate,
  // sanitizer.sanitizeCreate,
  controller.logoutUser
);
// router.get(
//   '/auth/google',
// controller.googleSignIn);
router.get(
  '/userbyid',
  // authenticator.authenticate,
  // validator.validateCreate,
  // sanitizer.sanitizeCreate,
  controller.reed_all_users_using_id
);
router.get(
  '/img',
  // authenticator.authenticate,
  // validator.validateCreate,
  // sanitizer.sanitizeCreate,
  controller.images
);
module.exports = router;
