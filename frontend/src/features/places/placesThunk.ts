import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Places, PlacesMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const getAllPlaces = createAsyncThunk<Places[], void>(
    'place/getAllPlaces',
    async () => {
        const response = await axiosApi.get<Places[]>('/places');
        return response.data || [];
    }
);

export const getOneByID = createAsyncThunk<Places, string>(
    'place/getOneByID',
    async (id) => {
        const response = await axiosApi.get<Places>(`/places${id}`);
        return response.data || null;
    }
);
export const create = createAsyncThunk<void,PlacesMutation>(
    'place/create',
    async (PlacesMutation) => {
        const formData = new FormData();

        const keys = Object.keys(PlacesMutation) as (keyof PlacesMutation)[];
        keys.forEach(key => {
            const value = PlacesMutation[key];

            if (value !== null) {
                formData.append(key, String(value));
            }
        })

        await axiosApi.post('/places', formData)
    }
);

export const deletePlace = createAsyncThunk<void, string>(
    'place/deletePlace',
    async (id) => {
        await axiosApi.delete<Places>(`/places${id}`);
    }
);