const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    balance: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
userSchema.plugin(require("./plugins/isDeletedFalse"));

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this(); // create a new User class
  this.findOne({ email: profile.email }, async (err, result) => {
    if (!result) {
      let newPassword =
        profile.password || "" + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      userObj.name = profile.name;
      userObj.email = profile.email;
      userObj.password = newPassword;
      userObj.googleId = profile.googleId;
      userObj.facebookId = profile.facebookId;
      // userObj.avatarUrl = profile.avatarUrl;
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  // delete obj._id;
  delete obj.__v;
  delete obj.googleId;
  delete obj.password;
  // delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.facebookId;
  return obj;
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password, function (_, isMatch) {
    return isMatch;
  });
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "365d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
