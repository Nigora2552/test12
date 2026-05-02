import express from "express";
import Place from "../models/Place";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";
import mongoose, {Error} from "mongoose";

const placesRouter = express.Router();


placesRouter.get('/', async (_req, res) => {
    const places = await Place.find();
    res.send(places)
});
placesRouter.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id as string);
    if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

    try {
        const place = await Place.findById(id);
        res.send(place)
    } catch (e) {
        next(e)
    }
});

placesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {

    try {
        if (!req.body.agreement || req.body.agreement !== 'true') {
            return res.status(400).send({
                errors: {
                    agreement: { message: 'Вы должны согласиться с условиями соглашения' }
                }
            });
        }
        const {user} = req as RequestWithUser;

        const newPlace = new Place({
            user: user._id,
            name: req.body.name,
            image: req.file ? 'images/' + req.file.filename : null,
            description: req.body.description,
        });

        await newPlace.save();
        res.send(newPlace)

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }

});

placesRouter.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id as string);
    if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

    try {
        await Place.findByIdAndDelete(id);
        res.send({message: 'Places deleted successfully.'});
    } catch (e) {
        next(e)
    }
});


export default placesRouter;