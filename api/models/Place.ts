import mongoose, {Schema} from "mongoose";

const PlaceSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
   description: {
        type: String,
       default: null,
   }
});


const Place = mongoose.model('Place', PlaceSchema);
export default Place;