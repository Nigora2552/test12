import {Button} from "@mui/material";
import type {User} from "../../../types";
import {useState} from "react";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/users/usersThunks.ts";
import noPhoto from "../../../assets/noPhoto.jpeg";
import {apiUrl} from "../../../constants.ts";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch()
    const [_anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    };

    const handleLogout = () => {
        dispatch(logout())
    }
    let userAvatar = noPhoto;

    if (user && user.avatar) {
        if (user.avatar.startsWith('http')) {
            userAvatar = user.avatar;
        } else {
            userAvatar = `${apiUrl}/${user.avatar}`;
        }
    }
    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
            >
                Hello, {user.displayName}
            </Button>
            <img
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                src={ userAvatar} alt={user.displayName}/>
            <span style={{margin: '0 10px'}}>or</span>
            <Button
            >
                <span onClick={handleLogout} style={{color: 'white'}}>Logout</span>
            </Button>
        </>
    );
};

export default UserMenu;