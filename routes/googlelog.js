const authenticator = require("../middleware/authenticator");
const controller = require("../controllers/googlelog");
const express = require("express");
const router = express.Router();
// const sanitizer = require("../sanitizers/onboarding");
// const validator = require("../validators/onboarding");
///////////////////////for sending otp


router.get(
  '/auth/google',
controller.googleSignIn);

// router.get('/auth/google/callback',
// controller.googleAuthCallback);
// //save
module.exports = router;
