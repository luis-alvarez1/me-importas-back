import mongoose from 'mongoose';

const Animal = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('animal', Animal);
