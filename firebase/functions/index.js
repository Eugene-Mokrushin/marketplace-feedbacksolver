const {auth, storage} = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUserProfile = auth.user().onCreate(async (user) => {
  const {uid, email} = user;

  const userProfile = {
    email: email || "",
    name: email.split("@")[0] || "test",
    plan: "Basic",
    tokenB: 100,
    tokenP: 10,
    files: [],
  };

  try {
    await admin.database().ref(`users/${uid}`).set(userProfile);
    console.log("User profile created successfully:", uid);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
});

exports.fillRelevantDataDB = storage.object().onFinalize(async (object) => {
  const {metadata, name} = object;

  const {uid, fileName} = metadata;
  const date = object.timeCreated;

  const fileData = {
    date,
    fileId: name,
    name: fileName,
  };

  try {
    const databaseRef = admin.database().ref(`users/${uid}/files`);
    const dataSnapshot = await databaseRef.once("value");
    const files = dataSnapshot.val() || [];

    files.push(fileData);
    await databaseRef.set(files);

    console.log("Data uploaded to Realtime Database successfully:", fileData);
  } catch (error) {
    console.error("Error uploading data to Realtime Database:", error);
  }
});
