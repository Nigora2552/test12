import express from "express";
import Images from "../models/Images";
import Place from "../models/Place";
import {imagesUpload} from "../middleware/multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import mongoose from "mongoose";

const imagesRouter = express.Router();

imagesRouter.get('/', async (_req, res) => {
    const images = await Images.find();
    res.send(images);
});

imagesRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

    try {
        const place = await Place.findById(req.body.place);
        if (!place) {
            return res.status(404).send({error: "Place not found"});
        }

        const newImage = new Images({
            user: req.body.user,
            place: place._id,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await newImage.save();
        res.send(newImage);
    } catch (e) {
        next(e);
    }
});

imagesRouter.get('/:id', auth, permit('admin'), async (req, res, next) => {
    const {id} = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id as string);
    if (!id || !isValid) return res.status(400).send({error: 'Id must be provided in request params'})

    try {
        await Images.findByIdAndDelete(id);
        res.send({message: 'Image deleted successfully'});
    } catch (e) {
        next(e)
    }
});
export default imagesRouter;