import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IReviews, ReviewsMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getReviews = createAsyncThunk<IReviews[], void>(
    'reviews/getReviews',
    async () => {
        const response = await axiosApi.get('/reviews');
        return response.data || [];
    }
);

export const createReviews = createAsyncThunk<void, ReviewsMutation>(
    'reviews/createReviews',
    async (ReviewsMutation) => {
        await axiosApi.post('/reviews', ReviewsMutation)
    }
)