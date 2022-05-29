import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../slicers/userSlice";
import firebase from "firebase/app";
import { Comment } from "../components/Post";

export const useComment = (postId: string) => {
    const user = useSelector(selectUser)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '',
            avatar: '',
            text: '',
            timestamp: null,
            username: ''
        }
    ])
    const [openComments, setOpenComments] = useState(false)

    const handleChangeOpenComments = () => {
        setOpenComments(!openComments)
    }

    useEffect(() => {
        const unSub = db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    avatar: doc.data().avatar,
                    text: doc.data().text,
                    username: doc.data().username,
                    timestamp: doc.data().timestamp
                })))
            })
        return () => {
            unSub()
        }
    }, [postId])

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
        newComment,
        comments,
        openComments,
        handleChangeOpenComments
    }
}