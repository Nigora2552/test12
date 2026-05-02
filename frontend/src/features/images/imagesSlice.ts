import type {IImages} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createImages, deleteImages, getAllImages} from "./imagesThunk.ts";

interface ImagesState {
    images: IImages[],
    loading: boolean;
}
const initialState: ImagesState = {
    images: [],
    loading: false,
}

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllImages.pending,(state) => {
            state.loading = true;
        }) ;
        builder.addCase(getAllImages.fulfilled,(state, {payload: images}) => {
            state.loading = false;
            state.images = images;
        }) ;
        builder.addCase(getAllImages.rejected,(state) => {
            state.loading = false;
        });

        builder.addCase(createImages.pending,(state) => {
            state.loading = true;
        }) ;
        builder.addCase(createImages.fulfilled,(state) => {
            state.loading = false;
        }) ;
        builder.addCase(createImages.rejected,(state) => {
            state.loading = false;
        });

        builder.addCase(deleteImages.pending,(state) => {
            state.loading = true;
        }) ;
        builder.addCase(deleteImages.fulfilled,(state) => {
            state.loading = false;
        }) ;
        builder.addCase(deleteImages.rejected,(state) => {
            state.loading = false;
        });
    }
})

const imagesReducer = imagesSlice.reducer;
export default imagesReducer;