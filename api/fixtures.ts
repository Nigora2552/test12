import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop')
    }

    const admin = new User(
        {
            email: 'admin@gmail.com',
            displayName: 'admin',
            password: '123',
            role: 'admin',
            token: '',
        });

    admin.generateAuthToken();
    await admin.save();

    const nika = new User(
        {
            email: 'nika@gmail.com',
            displayName: 'nika',
            password: '123',
            role: 'user',
            token: '',
        });

    nika.generateAuthToken();
    await nika.save();

    const alex = new User(
        {
            email: 'alex@gmail.com',
            displayName: 'alex',
            password: '123',
            role: 'user',
            token: '',
        });

    alex.generateAuthToken();
    await alex.save();

    // await Cocktail.create({
    //     user: alex!._id,
    //     title: 'Alex cocktail',
    //     recipe: 'cocktail recipe',
    //     image: null,
    //     ingredients:[
    //         {
    //             name: 'test name',
    //             amount: "5"
    //         }
    //     ],
    //     estimates:[
    //         {
    //             user: alex!._id,
    //             estimate: 1
    //         }
    //     ]
    // });
    // await Cocktail.create({
    //     user: nika!._id,
    //     title: 'Nika cocktail',
    //     recipe: 'cocktail recipe',
    //     image: null,
    //     ingredients:[
    //         {
    //             name: 'test name',
    //             amount: "5"
    //         }
    //     ],
    //     estimates:[
    //         {
    //             user: nika!._id,
    //             estimate: 1
    //         }
    //     ]
    // });

    await db.close()
}

run().catch(err => console.error(err))