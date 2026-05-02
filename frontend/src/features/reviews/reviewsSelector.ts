import type {RootState} from "../../app/store.ts";

export const selectReviews = (state: RootState) => state.reviews.reviews;
