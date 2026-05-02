import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Place from "./models/Place";
import Reviews from "./routes/reviews";
import Review from "./models/Review";
import Images from "./models/Images";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('places');
        await db.dropCollection('reviews');
    } catch (e) {
        console.log('Collections were not present, skipping drop')
    }

    const admin = new User(
        {
            username: 'admin',
            password: '123',
            role: 'admin',
            token: '',
        });

    admin.generateAuthToken();
    await admin.save();

    const nika = new User(
        {
            username: 'nika',
            password: '123',
            role: 'user',
            token: '',
        });

    nika.generateAuthToken();
    await nika.save();

    const alex = new User(
        {
            username: 'alex',
            password: '123',
            role: 'user',
            token: '',
        });

    alex.generateAuthToken();
    await alex.save();

    const alexPlace = await Place.create({
        user: alex!._id,
        name: 'Alex',
        image: null,
        description: null,
    });
    const nikaPlaces = await Place.create(
        {
            user: nika!._id,
            name: 'Nika',
            image: null,
            description: null,

        });

    await Review.create({
        user: alex!._id,
        place: alexPlace!._id,
        qualityFood: 2,
        qualityServer: 5,
        interior: 1,
        comment: 'Comment Alex',
    });
    await Review.create(
        {
            user: nika!._id,
            place: nikaPlaces!._id,
            qualityFood: 5,
            qualityServer: 5,
            interior: 3,
            comment: 'Comment Nika'
        });

    await Images.create(
        {
            user: nika!._id,
            place: nikaPlaces!._id,
            image: null
        });

    await Images.create(
        {
            user: alex!._id,
            place: nikaPlaces!._id,
            image: null
        });

    await db.close()
}

run().catch(err => console.error(err))