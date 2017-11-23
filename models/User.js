const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  facebookId: String
});

mongoose.model("users", UserSchema);
