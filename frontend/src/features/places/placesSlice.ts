import type {Places} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {create, deletePlace, getAllPlaces, getOneByID} from "./placesThunk.ts";

interface PlacesState {
    places: Places[],
    loading: boolean;
    onePlace: Places | null;
}
const initialState: PlacesState = {
    places: [],
    loading: false,
    onePlace: null,
}

export  const placesSlice = createSlice({
    name: 'place',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getAllPlaces.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPlaces.fulfilled, (state, {payload: places}) => {
            state.loading = false;
            state.places = places;
        });
        builder.addCase(getAllPlaces.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getOneByID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOneByID.fulfilled, (state,{payload: onePlace}) => {
            state.loading = false;
            state.onePlace = onePlace;
        });
        builder.addCase(getOneByID.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(create.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(create.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(create.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deletePlace.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePlace.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deletePlace.rejected, (state) => {
            state.loading = false;
        });
    }
})


export const placeReducer = placesSlice.reducer;