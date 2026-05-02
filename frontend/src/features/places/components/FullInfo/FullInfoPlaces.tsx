import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectLoading, selectPlace} from "../../placesSelector.ts";
import {selectImages} from "../../../images/imagesSelector.ts";
import {selectReviews} from "../../../reviews/reviewsSelector.ts";
import {useEffect} from "react";
import {getAllPlaces} from "../../placesThunk.ts";
import {getReviews} from "../../../reviews/reviewsThunk.ts";
import {getAllImages} from "../../../images/imagesThunk.ts";
import {CircularProgress} from "@mui/material";
import InfoAboutPlace from "./InfoAboutPlace.tsx";
import Images from "./Images.tsx";

const FullInfoPlaces = () => {
    const dispatch = useAppDispatch();
    const places = useAppSelector(selectPlace);
    const images = useAppSelector(selectImages);
    const reviews = useAppSelector(selectReviews);
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(getAllPlaces());
        dispatch(getReviews());
        dispatch((getAllImages()));
    }, []);


    return (
        <div style={{margin: '0 auto'}}>
            <h1 style={{textAlign: 'center'}}>Afterlife</h1>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px'}}>
                {loading && <CircularProgress/>}
                {!loading && places.length > 0 &&
                    <>
                        {places.map(place => (
                            <InfoAboutPlace key={place._id} place={place}/>
                        ))}
                    </>}
            </div>
            <h3 style={{textAlign: 'center'}}>Gallery</h3>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
            }}>
                {images && images.length > 0 &&
                    <>
                        {images.map(img => (
                            <Images key={img._id} img={img}/>
                        ))}
                    </>
                }</div>
            <hr/>

            <h4  style={{textAlign: 'center'}}>Ratings</h4>
            {reviews && reviews.length > 0 &&
            <>
                {reviews.map(rev => (
                    <ul key={rev._id} >
                        <li>Quality of food: {rev.qualityFood}
                           </li>
                        <li>Service quality: {rev.qualityServer}</li>
                        <li>Interior: {rev.interior}</li>
                    </ul>
                ))}
            </>
            }
        </div>

    );
};

export default FullInfoPlaces;