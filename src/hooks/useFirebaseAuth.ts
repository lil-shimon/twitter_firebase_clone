import { auth, provider } from "../firebase";
import { ChangeEvent, useCallback, useState } from "react";

export const useFirebaseAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true)

    const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
       setEmail(e.target.value)
    }, [email])

    const handleChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [password])

    const handleChangeIsLogin = useCallback(() => {
        setIsLogin(!isLogin)
    }, [isLogin])

    const signInEmail = useCallback(async () => {
        await auth.signInWithEmailAndPassword(email, password)
    }, [email, password])

    const signUpEmail = useCallback(async () => {
        await auth.createUserWithEmailAndPassword(email, password)
    }, [email, password])

    const signInGoogle = async () => {
        await auth.signInWithPopup(provider).catch((err) => {
            alert(err.message);
        })
    }

    return {
        signInGoogle,
        email,
        password,
        isLogin,
        signInEmail,
        signUpEmail,
        handleChangeIsLogin,
        handleChangeEmail,
        handleChangePassword
    }
}