try {
    const Response = require("../services/response");
  const Operations = require("../operations/googlelog");
  const conn = require("../connections/ini");
    // const authController = require('../controllers/authController');
  // const { configureGoogleStrategy } = require('../auth');
  /////////////////////////for sending otp
  exports.googleSignIn = async (req, res, next) => {
    try {
      const { idToken } = req.body;
      console.log(idToken)
      const signInResult = await Operations.signInWithGoogle(idToken);
      if (signInResult.success) {
        // Google sign-in successful, redirect or respond as needed
        res.redirect('/profile');
      } else {
        // Google sign-in failed
        res.status(500).json({ code: 500, message: 'Failed to sign in with Google.', error: signInResult.error });
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      res.status(500).json({ code: 500, message: 'Internal server error.' });
    }
  };
  
  
  // exports.logoutUser = async (req, res, next) => {
  //   try {
  //     const { userId } = req.body;
  //     const response = await logoutUser(userId);
  //     res.status(response.code).send(response);
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     res.status(Response.internal_server_error.code).send(Response.internal_server_error);
  //   }
  // };
  
  
  } catch (e) {
    console.log(e)
  }