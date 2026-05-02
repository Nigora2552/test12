import express from "express";
import Review from "../models/Review";
import auth, {RequestWithUser} from "../middleware/auth";
import Place from "../models/Place";

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (_req, res, next) => {
    try {
        const places = await Place.find().lean();

        const result = [];
        for (const place of places) {
            const reviews = await Review.find({place: place._id});
            let overallRating = 0;

            if (reviews.length > 0) {
                const totalSum = reviews.reduce((acc, r) => {
                    return acc + (r.qualityFood + r.qualityServer + r.interior) / 3;
                }, 0);
                overallRating = totalSum / reviews.length;
            }

            result.push({
                ...place,
                rating: Number(overallRating.toFixed(1)),
                reviews: reviews
            });
        }

        res.send(result);
    } catch (e) {
        next(e)
    }
});
reviewsRouter.post('/', auth, async (req, res, next) => {
    try {
        const {user} = req as RequestWithUser;

        const place = await Place.findById(req.body.place)
        if (!place) return res.status(404).send("Place not found");

        const newReviews = new Review({
            user: user._id,
            place: place._id,
            comment: req.body.comment,
            qualityFood: Number(req.body.qualityFood),
            qualityServer: Number(req.body.qualityServer),
            interior: Number(req.body.interior),
        });

        await newReviews.save();
        res.send(newReviews);


    } catch (e) {
        next(e)
    }
})


export default reviewsRouter;