import type {RootState} from "../../app/store.ts";

export const selectPlace = (state: RootState) => state.places.places;
export const selectLoading = (state: RootState) => state.places.loading;