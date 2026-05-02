import React from 'react';
import noPhoto from "../../../../assets/noPhoto.jpeg";
import {apiUrl} from "../../../../constants.ts";
import type {IImages} from "../../../../types";

interface Props{
    img: IImages;
}
const Images:React.FC<Props> = ({img}) => {

    const image = img.image;

    let cardImage = noPhoto;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }
    return (
        <img src={cardImage} alt={img._id}/>
    );
};

export default Images;