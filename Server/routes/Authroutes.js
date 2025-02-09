const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  changePassword,
  forgotPassword,
  verifyUserEmail,
  oauth_via_google,
  getGhUser,
} = require("../controllers/auth");
const fetchUser = require("../middlewares/fetchUser");
const verifyEmail = require("../middlewares/verifyUserEmail");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/login_via_google", oauth_via_google);
router.post("/getGhUser", getGhUser);
router.get("/", fetchUser, getUser);
router.put("/edit_details", fetchUser, updateUser);
router.put("/change_password", fetchUser, changePassword);
router.post("/verify_email", verifyUserEmail);
router.put("/forgot_password", verifyEmail, forgotPassword);

module.exports = router;
