import {type PropsWithChildren, useEffect} from "react";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

interface Props extends PropsWithChildren {
    isAllowed: boolean | null;
}

const ProtectedRouter: React.FC<Props> = ({isAllowed, children}) => {
    useEffect(() => {
        if (!isAllowed) {
            toast.warning('You are not allowed to access this page');
        }
    }, [isAllowed]);

    if (!isAllowed) {
        return <Navigate to="/login" replace />;
    }

    return children

};

export default ProtectedRouter;