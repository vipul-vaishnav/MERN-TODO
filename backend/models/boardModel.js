import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },

    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model;

const boardModel = new Model('Board', boardSchema);

export default boardModel;
