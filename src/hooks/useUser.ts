import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../slicers/userSlice";
import { useEffect } from "react";
import { auth } from "../firebase";

export const useUser = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(login({
                    uid: authUser.uid,
                    photoUrl: authUser.photoURL,
                    displayName: authUser.displayName
                }))
            }
            if (!authUser) dispatch(logout())
        })

        return () => {
            unSub()
        }
    }, [dispatch]);


    return {
        user
    }
}