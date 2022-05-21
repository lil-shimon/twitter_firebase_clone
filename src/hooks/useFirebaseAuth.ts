import { auth, provider } from "../firebase";

export const useFirebaseAuth = () => {
    const signInGoogle = async () => {
       await auth.signInWithPopup(provider).catch((err) => {
           alert(err.message);
       })
    }

    return {
        signInGoogle
    }
}