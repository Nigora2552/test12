import React from 'react';
import type {Places} from "../../../../types";
import noPhoto from "../../../../assets/noPhoto.jpeg";
import {apiUrl} from "../../../../constants.ts";

interface Props{
    place: Places
}

const InfoAboutPlace:React.FC<Props> = ({place}) => {
    const image = place.image;

    let cardImage = noPhoto;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    return (
        <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center',flexWrap: 'wrap', gap: '35px'}}>
            <p style={{width: '30%'}}>{place.description}</p>
            <img width={'20%'} src={cardImage} alt={place.name}/>
        </div>
    );
};

export default InfoAboutPlace;