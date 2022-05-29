import styles from './Post.module.css'
import { FC, FormEvent } from "react";
import { Avatar } from "@material-ui/core";
import { useComment } from "../hooks/useComment";
import SendIcon from "@material-ui/icons/Send";

interface Props {
    postId: string
    avatar: string
    image: string
    text: string
    timestamp: any
    username: string
}

export const Post: FC<Props> = ({ postId, avatar, image, text, timestamp, username }) => {
    const { comment, handleChangeComment, newComment } = useComment(postId)
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
                        <img src={image} alt={"tweet"}/>
                    </div>
                )}
                <form onSubmit={newComment}>
                    <div className={styles.post_form}>
                        <input
                            className={styles.post_input}
                            type={"text"}
                            placeholder={"Type new comment..."}
                            value={comment}
                            onChange={(e) => handleChangeComment(e)}
                        />
                        <button
                            className={comment ? styles.post_button : styles.post_buttonDisable}
                            disabled={!comment}
                            type={"submit"}
                        >
                            <SendIcon className={styles.post_sendIcon}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
