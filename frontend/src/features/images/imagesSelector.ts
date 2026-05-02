import type {RootState} from "../../app/store.ts";

export const selectImages = (state: RootState) => state.images.images;
export const selectLoading = (state: RootState) => state.images.loading;