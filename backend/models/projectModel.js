import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
    },

    key: {
      type: String,
      required: [true, 'Please enter a key'],
      trim: true,
    },

    owner: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ['Software', 'Marketing', 'Business', 'Research & Development (R/D)', 'Educational', 'Other'],
    },

    status: {
      type: String,
      required: true,
      enum: ['New', 'Active', 'Proposed', 'Approved', 'Unapproved', 'onHold', 'Closed'],
      default: 'New',
    },

    priority: {
      type: String,
      required: true,
      enum: ['High', 'Medium', 'Low'],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    url: {
      type: String,
    },

    description: {
      type: String,
      required: [true, 'Please enter a description'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model;

const projectModel = new Model('Project', projectSchema);

export default projectModel;
