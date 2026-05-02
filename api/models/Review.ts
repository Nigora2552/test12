import mongoose, {Schema} from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    comment: {
        type: String,
        required: true
    },
    qualityFood: {
        type: Number,
            required: true,
            min: 1, max: 5
        },
   qualityServer: {
        type: Number,
        required: true,
        min: 1, max: 5
    },
    interior: {
        type: Number,
        required: true,
        min: 1, max: 5
    },
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;