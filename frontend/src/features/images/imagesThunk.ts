import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IImages, ImagesMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import type {AppDispatch} from "../../app/store.ts";

export const getAllImages = createAsyncThunk<IImages[], void>(
    'images/getAllImages',
    async () => {
        const response = await axiosApi.get<IImages[]>('/images')
        return response.data || [];
    }
);

export const deleteImages = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'images/deleteImages',
    async (id,thunkAPI) => {
       await axiosApi.delete(`/images${id}`);
       await thunkAPI.dispatch(getAllImages())
    }
);

export const createImages = createAsyncThunk<void, ImagesMutation>(
    'images/createImages',
    async (ImagesMutation) => {
        const formData = new FormData();

        const keys = Object.keys(ImagesMutation) as (keyof ImagesMutation)[];
        keys.forEach(key => {
            const value = ImagesMutation[key];

            if (value !== null) {
                formData.append(key, String(value));
            }
        })

        await axiosApi.post('/images', formData)
    }
)