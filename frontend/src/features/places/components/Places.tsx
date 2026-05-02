import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectLoading, selectPlace} from "../placesSelector.ts";
import {useEffect} from "react";
import {getAllPlaces} from "../placesThunk.ts";
import {CircularProgress} from "@mui/material";
import CardPlace from "./CardPlace.tsx";


const Places = () => {
    const dispatch = useAppDispatch();
    const places = useAppSelector(selectPlace);
const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(getAllPlaces())
    }, []);


    return (
        <>
            <h1>All places</h1>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px'}}>
                {loading && <CircularProgress/>}
                {!loading && places.length > 0 &&
                    <>{places.map(place => (
                        <CardPlace key={place._id} place={place}/>
                    ))}</>
                }
            </div>
        </>

    );
};

export default Places;