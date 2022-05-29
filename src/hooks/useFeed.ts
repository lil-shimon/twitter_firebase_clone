import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useFeed = () => {
    const [posts, setPosts] = useState([
        {
            id: "",
            avatar: "",
            image: "",
            text: "",
            timestamp: null,
            username: ""
        }
    ])

    useEffect(() => {
        const unSub = db.collection("posts")
            .orderBy("timestamp", 'desc')
            .onSnapshot((snapshot) => setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    avatar: doc.data().avatar,
                    image: doc.data().image,
                    text: doc.data().text,
                    timestamp: doc.data().timestamp,
                    username: doc.data().username
                }))
            ))
        return () => {
            unSub()
        }
    }, [])

    return {
        posts
    }
}