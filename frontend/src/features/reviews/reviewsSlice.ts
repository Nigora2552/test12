import type {IReviews} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createReviews, getReviews} from "./reviewsThunk.ts";

interface ReviewsState {
    reviews: IReviews[],
    loading: boolean;
}
const initialState: ReviewsState = {
    reviews: [],
    loading: false,
}

export  const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReviews.fulfilled, (state, {payload: reviews}) => {
            state.loading = false;
            state.reviews = reviews;
        });
        builder.addCase(getReviews.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(createReviews.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createReviews.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createReviews.rejected, (state) => {
            state.loading = false;
        });
    }
})


export const reviewsReducer = reviewsSlice.reducer;