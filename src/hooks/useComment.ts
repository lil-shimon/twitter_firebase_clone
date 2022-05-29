import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../slicers/userSlice";
import firebase from "firebase/app";

export const useComment = (postId: string) => {
    const user = useSelector(selectUser)
    const [comment, setComment] = useState("")

    const handleChangeComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }, [comment])

    const newComment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        db.collection("posts").doc(postId).collection("comments")
            .add({
                avatar: user.photoUrl,
                text: comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName
            })
        setComment("")
    }

    return {
        comment,
        handleChangeComment,
        newComment
    }
}