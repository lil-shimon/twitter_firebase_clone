import { FC, memo } from "react";
import { auth } from '../firebase'
import { TweetInput } from "./TweetInput";
import styles from './Feed.module.css'
import { useFeed } from "../hooks/useFeed";
import { Post } from "./Post";

const Feed: FC = () => {
    const { posts } = useFeed()
    return (
        <div className={styles.feed}>
            Feed
            <TweetInput/>
            {posts[0]?.id && (
                <>
                    {posts.map((post) => (
                        <Post postId={post.id} avatar={post.avatar} image={post.image} text={post.text}
                              timestamp={post.timestamp} username={post.username} key={post.id}/>
                    ))}
                </>
            )}
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}

export const FeedComponent = memo(Feed)