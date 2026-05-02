import mongoose, {Document, HydratedDocument, Model} from "mongoose";
import {UserFields} from "../types";
import jwt from "jsonwebtoken"
import config from "../config";
import argon2 from "argon2";


interface userMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => void;
}

type UserModel = Model<UserFields, {}, userMethods>

const UserSchema = new mongoose.Schema<HydratedDocument<UserFields>,
    UserModel,
    userMethods,
    {}>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
    },
    displayName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: null,
    },
    googleID: String,

});

UserSchema.path('email').validate({
    validator: async function (this: Document, value: string) {
        if (!this.isModified('email')) return true;

        const user = await User.findOne({email: value});
        return !user;
    },
    message: 'Email is already exists.Please choose another one'
});

UserSchema.methods.checkPassword = function (password: string) {
    return argon2.verify(this.password, password)
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        this.password = await argon2.hash(this.password,{
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
        });
    } catch (e) {
        throw new Error('Error hashing password');
    }
});

UserSchema.methods.generateAuthToken = function () {
    this.token = jwt.sign({_id: this._id},
        config.jwtSecret,
        {expiresIn: '30d'});
};

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        const {password,token, ...rest} = ret
        return rest;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;