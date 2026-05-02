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
        name: 'Дияр',
        image: null,
        description: '"Цезарь" не соседствует с роллами "Калифорния" , мало мест, где действительно вкусно готовят, мало мест, куда хочется вернуться снова. В какой-то момент у Москвы обозначился предел и мне стало неинтересно. Всё это предисловие к тому о чем я хочу сейчас рассказать.\n' +
            '\n' +
            'Самое удивительное качество этого города в том, что он, как коробка конфет с потайным дном. Когда кажется, что всё изучено и понятно, вдруг открывается что-то совершенно новое. Сегодня я была на свидании в недавно открывшемся Ragout - проекте Алексея Зимина и ресторатора Кати Дроздовой. Для меня это место - самое большое открытие этого года. Честно говоря, от Зимина ожидать среднего места невозможно - то как и что он делает в принципе (передачи, журнал, книги) у меня всегда вызывало уважение. Но Ragout действительно восхищает.\n',
    });
    const nikaPlaces = await Place.create(
        {
            user: nika!._id,
            name: 'Arzu',
            image: null,
            description: 'Сегодня в  Ragout, хоть он и не претендует на звание ресторана, я ощутила именно то чувство, какое по-видимому должны испытывать девушки из фильмов: торжественность и важность момента. Правда, торжественность была не по случаю помолвки, а по случаю самой еды. Потому что она была бесподобна. Вот визуальные доказательства:',

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