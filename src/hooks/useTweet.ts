import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../slicers/userSlice";

export const useTweet = () => {

    const user = useSelector(selectUser)
    const [tweetImg, setTweetImg] = useState<File | null>(null)
    const [tweetMsg, setTweetMsg] = useState('')

    const handleChangeTweetImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setTweetImg(e.target.files![0])
            e.target.value = ""
        }
    }

    const handleChangeTweetMsg = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTweetMsg(e.target.value)
    }, [tweetMsg])

    const postTweetToFirestore = async (url: string) => {
        await db.collection("posts").add({
            avatar: user.photoUrl, image: url,
            text: tweetMsg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: user.displayName
        })
    }

    const sendTweet = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (tweetImg) {
            const S = "abcdefghijklmnopqrstuvwxyz0123456789"
            const N = 16
            const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                .map((n) => S[n % S.length])
                .join("")
            const fileName = randomChar + "_" + tweetImg.name
            const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImg)
            uploadTweetImg.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                () => {
                },
                (err) => {
                    alert(err.message)
                }, async () => {
                    await storage.ref("images").child(fileName).getDownloadURL().then(
                        async (url) => {
                            await postTweetToFirestore(url);
                        }
                    )
                }
            )
        } else {
            postTweetToFirestore("")
        }
        setTweetMsg('')
        setTweetImg(null)
    }, [tweetMsg, tweetImg, user])

    return {
        tweetImg,
        tweetMsg,
        handleChangeTweetImg,
        handleChangeTweetMsg,
        sendTweet
    }
}