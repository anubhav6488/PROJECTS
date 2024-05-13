try {
  const Response = require("../services/response");
const Operations = require("../operations/onboarding");
const conn = require("../connections/ini");
  // const authController = require('../controllers/authController');
// const { configureGoogleStrategy } = require('../auth');
/////////////////////////for sending otp
exports.create = exports.create_idpass = async (
  req,
  res,
  next
) => {
  try {
    let {
      Name,
      Email_Address,
      password,
    } = req.body;
    console.log(req.body);

    // let { id } = req.decoded;
    // console.log("_____________________________________________",req.decoded)


    let response = await Operations.create_registrations(
      Name,
      Email_Address,
      password,
    );
  //coment
    res.status(response.code).send(response);
  } catch (e) {
    console.log(e);

    res.status(500).send({
      code: 500,
      message: "Internal Server Error",
    });
  }
};



exports.reed_all_users = async (req, res, next) => {
  try {
    let { f_name } = req.body;
    let { f_password } = req.body;
    let response = await Operations.reed_all_users(f_name,f_password);
    console.log

    res.status(response.code).send(response);
  } catch (error) {
    res
      .status(Response.internal_server_error.code)
      .send(Response.internal_server_error);
  }
};

exports.images = exports.image = async (
  req,
  res,
  next
) => {
  try {
    let {
      imageData
    } = req.body;
    console.log(req.body);

    // let { id } = req.decoded;
    // console.log("_____________________________________________",req.decoded)


    let response = await Operations.uploadImageToFirebaseStorage(
      imageData
    );
  //coment
    res.status(response.code).send(response);
  } catch (e) {
    console.log(e);

    res.status(500).send({
      code: 500,
      message: "Internal Server Error",
    });
  }
};


exports.logoutUser = async (req, res, next) => {
  try {
    let { UserID } = req.body;
    let response = await Operations.logoutUser(UserID);
    console.log

    res.status(response.code).send(response);
  } catch (error) {
    res
      .status(Response.internal_server_error.code)
      .send(Response.internal_server_error);
  }
};


exports.reed_all_users_using_id = async (req, res, next) => {
  try {
    let { ID } = req.body;
  
    let response = await Operations.reed_all_users_using_id(ID);
    console.log

    res.status(response.code).send(response);
  } catch (error) {
    res
      .status(Response.internal_server_error.code)
      .send(Response.internal_server_error);
  }
};


// exports.googleSignIn = async (req, res, next) => {
//   try {
//     const signInResult = await Operations.signInWithGoogle();
//     if (signInResult.success) {
//       // Google sign-in successful, redirect or respond as needed
//       res.redirect('/profile');
//     } else {
//       // Google sign-in failed
//       res.status(500).json({ code: 500, message: 'Failed to sign in with Google.', error: signInResult.error });
//     }
//   } catch (error) {
//     console.error('Google sign-in error:', error);
//     res.status(500).json({ code: 500, message: 'Internal server error.' });
//   }
// };


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