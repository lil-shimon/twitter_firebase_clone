import styles from './Post.module.css'
import { FC, FormEvent } from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import { useComment } from "../hooks/useComment";
import SendIcon from "@material-ui/icons/Send";
import { MessageOutlined } from "@material-ui/icons";

interface Props {
    postId: string
    avatar: string
    image: string
    text: string
    timestamp: any
    username: string
}

export interface Comment {
    id: string
    avatar: string
    text: string
    timestamp: any
    username: string
}

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1),
    }
}))

export const Post: FC<Props> = ({ postId, avatar, image, text, timestamp, username }) => {
    const classes = useStyles()
    const {
        comment,
        comments,
        handleChangeComment,
        newComment,
        handleChangeOpenComments,
        openComments
    } = useComment(postId)
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

                <MessageOutlined
                    className={styles.post_commentIcon}
                    onClick={handleChangeOpenComments}
                />

                {openComments &&
                    <>
                        {comments.map((comment) => (
                            <div key={comment.id} className={styles.post_comment}>
                                <Avatar src={comment.avatar} className={classes.small}/>
                                <span className={styles.post_commentUser}>@{comment.username}</span>
                                <span className={styles.post_commentText}>{comment.text}</span>
                                <span className={styles.post_headerTime}>
                            {new Date(comment.timestamp?.toDate()).toLocaleString()}
                        </span>
                            </div>
                        ))}

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
                    </>
                }
            </div>
        </div>
    )
}
