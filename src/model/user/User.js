import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
      min: 10,
      max: 10,
    },
  },
  { timestamps: true },
);

export default mongoose.model('user', User);
