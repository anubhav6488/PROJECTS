const passport = require('passport');
const { Firestore } = require('@google-cloud/firestore');
const admin = require('firebase-admin');
// const auth = admin.auth();

const {
    collection,
    doc,
    setDoc,
    query,
    addDoc,
    getDocs,
    getDoc,
    where,
    collectionGroup,
    startAt,
    orderBy,
    endAt,
    limit,
    startAfter,
    documentId,
    updateDoc,
    serverTimestamp,
  } = require("firebase/firestore");
  const { getStorage, ref, getDownloadURL } = require("firebase/storage");
  // const googleProvider = new admin.auth.GoogleAuthProvider();

  const fireDB = require("../connections/firebase");
  // const db = require("../connections/db");
  
  const async = require("async");
  const Constant = require("../lib/constants");
  const { firestore } = require("firebase-admin");
  const Admin = require("mongodb/lib/admin");
  const { all } = require("axios");
  var serviceAccount = require("../connections/googleauth.json");
  var inis=require("../connections/ini")
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount)
  //   // Other configuration options if needed
  // });
let self = (module.exports = {
  /** 
   * for Creating Users
   * 
   * */
  create_registrations: async function (Name,Email_Address, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          Name:Name,
          Email_Address:Email_Address,
          password:password,
        };
        console.log(data);
        let result = await addDoc(
          collection(fireDB, "password & id"),
          data
        );

        resolve({
          message: "Record saved successfuly",
          code: 200,
          data: result.id,
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },


  reed_all_users: async function(f_name, f_password) {
    try {
      const userCollectionRef = collection(fireDB, 'password & id');

      if (!f_name || !f_password) {
        throw new Error('Invalid field values for name or password.');
      }
  
  
      // Query documents based on name and password criteria
      const querySnapshot = await getDocs(
        query(userCollectionRef, where('Name', '==', f_name), where('password', '==', f_password))
      );
  
  
      const data = [];
  
      querySnapshot.forEach(doc => {
        const userData = { id: doc.id, ...doc.data() };
        data.push(userData);
      });
  
      if (data.length > 0) {
        // Return user data if documents are found
        return {
          code: 200,
          data: data,
        };
      } else {
        console.log("No users found matching the provided credentials.");
        return {
          code: 404,
          message: 'No users found matching the provided credentials.',
        };
      }
    } catch (error) {
      console.error('Error retrieving users:', error);
      return {
        code: 500,
        message: 'Failed to retrieve users. Please try again later.',
      };
    }
  },



  reed_all_users_using_id: async function(ID) {
    try {
      let data = [];
      // console.log(id)
      const userCollectionRef = collection(fireDB, 'password & id');
  
  
      // Query documents based on name and password criteria
      const docRef = await getDocs(
        query(userCollectionRef, where('id', '==', ID))
      );
      const test=docRef.docs.map((o) => {
        return { id: o.id, data: o.data() };
        
        console.log(test)
      })

    
      // const test2=test[0].data
     
      // data.push(test)
      // const data = [];
      // const querySnapshot = await getDocs(docRef);
  
      // let category = querySnapshot.docs.map((o) => {
      //   return { id: o.id, data: o.data() };
      // });

      if (data.length > 0) {
        // Return user data if documents are found
        return {
          code: 200,
          data: data,
        };
      } else {
        console.log("No users found matching the provided credentials.");
        return {
          code: 404,
          message: 'No users found matching the provided credentials.',
        };
      }
    } catch (error) {
      console.error('Error retrieving users:', error);
      return {
        code: 500,
        message: 'Failed to retrieve users. Please try again later.',
      };
    }
  },

//   reed_all_users_using_id: async function(ID) {
//     try {
//         const docRef = collection(fireDB, "password & id");
//         const querySnapshot = await getDocs(docRef);
        
//         let userData = null;
//         let userId = null;
        
//         querySnapshot.forEach(doc => {
//             const userDataFromDB = doc.data();
//             // Assuming email field exists in your document data
//             if (userDataFromDB.id === ID && d) {
//                 userData = userDataFromDB;
//                 userId = doc.id;
//                 return true; // Terminate the loop after finding the user
//             }
//         });

//         if (userData) {
//             console.log("User found!");
//             return {
//                 code: 200,
//                 data: userId
//             };
//         } else {
//             console.log("User not found!");
//             return {
//                 code: 404,
//                 data: "Not Found"
//             };
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return {
//             code: 500,
//             message: "Internal Server Error"
//         };
//     }
// },



reed_all_users_using_id: async function(name) {
  try {
      const docRef = collection(fireDB, "login");
      const querySnapshot = await getDocs(docRef);
      
      let userData = null;
      let userId = null;
      
      querySnapshot.forEach(doc => {
          const userDataFromDB = doc.data();
          // Assuming email field exists in your document data
          if (userDataFromDB.Name === Name) {
              userData = userDataFromDB;
              userId = doc.id;
              return true; // Terminate the loop after finding the user
          }
      });

      if (userData) {
          console.log("User found!");
          return {
              code: 200,
              data: userId
          };
      } else {
          console.log("User not found!");
          return {
              code: 404,
              data: "Not Found"
          };
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      return {
          code: 500,
          message: "Internal Server Error"
      };
  }
},


  logoutUser:async function(userId) {
    try {
      const userDocRef = doc(collection(fireDB, 'password & id'), userId);
  
      // Check if the user document exists
      const userSnapshot = await getDoc(userDocRef);
  
      if (!userSnapshot.exists()) {
        throw new Error('User not found');
      }
  
      // Invalidate user session (e.g., set token to null)
      await updateDoc(userDocRef, {
        token: null, // Set the token field to null or remove it from the user document
      });
  
      // Respond with a success message
      return {
        code: 200,
        message: 'User successfully logged out.',
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        code: 500,
        message: 'Failed to logout. Please try again later.',
      };
    }
  },

  uploadImageToFirebaseStorage:async function (imageData) {
    try {
      const storage = admin.storage(); 
      const fileName = `${Date.now()}_${Math.floor(Math.random() * 100000)}.jpg`; // Example: 1620922637879_12345.jpg
      const storageRef = storage.bucket().file(fileName);
  
   
      await storageRef.save(imageData, {
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            firebaseStorageDownloadTokens: fileName, 
          },
        },
      });
  
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.bucket().name}/o/${encodeURIComponent(fileName)}?alt=media`;
      console.log(`Image uploaded successfully. Image URL: ${imageUrl}`);
  
      return {
        code: 200,
        message: 'Image uploaded successfully',
        imageUrl: imageUrl,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      return {
        code: 500,
        message: 'Failed to upload image',
        error: error.message,
      };
    }
  }

});

