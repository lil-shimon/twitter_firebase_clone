import { auth, provider, storage } from "../firebase";
import { ChangeEvent, useCallback, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../slicers/userSlice";

export const useFirebaseAuth = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('')
    const [avatarImage, setAvatarImage] = useState<File | null>(null)
    const [isLogin, setIsLogin] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [resetEmail, setResetEmail] = useState("")

    const sendResetEmail = useCallback(async (e: MouseEvent<HTMLElement>) => {
        await auth.sendPasswordResetEmail(resetEmail)
            .then(() => {
                setOpenModal(false)
                setResetEmail("")
            })
            .catch((err) => {
                alert(err.message)
                setResetEmail("")
            })
    }, [resetEmail, openModal])

    const handleChangeUserName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }, [username])

    const handleChangeOpenModal = useCallback(() => {
        setOpenModal(!openModal)
    }, [openModal])

    const handleChangeResetEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setResetEmail(e.target.value)
    }, [resetEmail])

    const handleChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0])
            e.target.value = ""
        }
    }, [avatarImage])

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
        const authUser = await auth.createUserWithEmailAndPassword(email, password)
        let url = ""
        if (avatarImage) {
            // to avoid a same file name, generate random name
            const S = "abcdefghijklmnopqrstuvwxyz0123456789"
            const N = 16
            const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                .map((n) => S[n % S.length])
                .join("")
            const fileName = randomChar + "_" + avatarImage.name

            // upload avatar image to cloud storage
            await storage.ref(`avatars/${fileName}`).put(avatarImage)
            url = await storage.ref('avatars').child(fileName).getDownloadURL()
        }

        await authUser.user?.updateProfile({
            displayName: username,
            photoURL: url
        })

        dispatch(updateUserProfile({
            displayName: username,
            photoUrl: url
        }))
    }, [email, password, username, avatarImage])

    const signInGoogle = async () => {
        await auth.signInWithPopup(provider).catch((err) => {
            alert(err.message);
        })
    }

    const signOut = async () => {
        await auth.signOut()
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
        handleChangePassword,
        username,
        avatarImage,
        handleChangeImage,
        handleChangeUserName,
        openModal,
        handleChangeOpenModal,
        resetEmail,
        handleChangeResetEmail,
        sendResetEmail,
        signOut
    }
}