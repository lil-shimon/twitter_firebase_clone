import { FC, memo } from "react";
import { auth } from '../firebase'
import { TweetInput } from "./TweetInput";
import styles from './Feed.module.css'
import { useFeed } from "../hooks/useFeed";

const Feed: FC = () => {
    const {posts} = useFeed()
    return (
        <div className={styles.feed}>
            Feed
            <TweetInput/>
            {posts.map((post) => (
                <div>{post.id}</div>
            ))}
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}

export const FeedComponent = memo(Feed)