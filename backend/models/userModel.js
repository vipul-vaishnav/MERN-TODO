import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    agree_tnc: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model;

const userModel = Model('User', userSchema);

export default userModel;
