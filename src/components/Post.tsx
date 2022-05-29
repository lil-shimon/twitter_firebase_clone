import styles from './Post.module.css'
import { FC } from "react";
import { Avatar } from "@material-ui/core";

interface Props {
    postId: string
    avatar: string
    image: string
    text: string
    timestamp: any
    username: string
}

export const Post: FC<Props> = ({ postId, avatar, image, text, timestamp, username }) => {
    return (
        <div className={styles.post}>
            <div className={styles.post_avatar}>
                <Avatar src={avatar}/>
            </div>
            <div className={styles.post_body}>
                <div className={styles.post_header}>
                    <h3>
                        <span className={styles.post_headerUser}>@{username}</span>
                        <span className={styles.post_headerTime}>
                            {new Date(timestamp?.toDate()).toLocaleString()}
                        </span>
                    </h3>
                </div>
                <div className={styles.post_tweet}>
                    <p>{text}</p>
                </div>
                {image && (
                    <div className={styles.post_tweetImage}>
                        <img src={image} alt={"tweet"} />
                    </div>
                )}
            </div>
        </div>
    )
}
