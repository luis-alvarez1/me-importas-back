import mongoose from 'mongoose';

const Pendiente = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        state: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model('pendiente', Pendiente);
