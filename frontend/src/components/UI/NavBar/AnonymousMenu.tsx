
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
        <Button component={NavLink} to='/register' color="inherit">Sing Up</Button>
            <span>or</span>
        <Button component={NavLink} to='/login' color="inherit">Sing In</Button>
        </>
    );
};

export default AnonymousMenu;