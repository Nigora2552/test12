import type {Places} from "../../../types";
import {apiUrl} from "../../../constants.ts";
import noPhoto from '../../../assets/noPhoto.jpeg'
import {NavLink} from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectReviews} from "../../reviews/reviewsSelector.ts";
import {useEffect} from "react";
import {getReviews} from "../../reviews/reviewsThunk.ts";

interface Props {
    place: Places
}

const CardPlace: React.FC<Props> = ({place}) => {
const dispatch = useAppDispatch();
const reviews = useAppSelector(selectReviews);


    useEffect(() => {
        dispatch(getReviews());
    }, []);
    const image = place.image;

    let cardImage = noPhoto;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    return (
        <div style={{width: '250px'}}>
            <img width='100%' src={cardImage} alt={place.name}/>
            <NavLink to={`/${place._id}/places`}>{place.name}</NavLink>
            <Stack spacing={1}>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5}/>
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly/>
            </Stack>
            { reviews.map(rev => (
                <p key={rev._id}>({rev.rating} reviews)</p>
            ))}
            <LocalSeeIcon/>
        </div>
    );
};

export default CardPlace;