// src/models/userModel.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
});

const userModel = mongoose.model('user', userSchema);
export default userModel;
