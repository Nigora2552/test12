import mongoose, {Schema} from "mongoose";

const ImagesSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    image: { type: String, default: null }
});

const Images = mongoose.model('Images', ImagesSchema);
export  default Images;