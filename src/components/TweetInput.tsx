import styles from "./TweetInput.module.css"
import { useUser } from "../hooks/useUser";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useTweet } from "../hooks/useTweet";
import { AddAPhoto } from "@material-ui/icons";

export const TweetInput = () => {
    const { user } = useUser()
    const { signOut } = useFirebaseAuth()
    const { tweetMsg, tweetImg, sendTweet, handleChangeTweetImg, handleChangeTweetMsg } = useTweet()
    return (
        <>
            <form onSubmit={sendTweet}>
                <div className={styles.tweet_form}>
                    <Avatar
                        className={styles.tweet_avatar}
                        src={user.photoUrl}
                        onClick={signOut}
                    />
                    <input
                        className={styles.tweet_input}
                        placeholder={"What's new?"}
                        autoFocus
                        type={"text"}
                        value={tweetMsg}
                        onChange={(e) => handleChangeTweetMsg(e)}
                    />
                    <IconButton>
                        <label>
                            <AddAPhoto
                                className={
                                    tweetImg ? styles.tweet_addIconLoaded : styles.tweet_addIcon
                                }
                            />
                            <input
                                className={styles.tweet_hiddenIcon}
                                type={"file"}
                                onChange={handleChangeTweetImg}
                            />
                        </label>
                    </IconButton>
                </div>
                <Button
                    className={tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn}
                    type={"submit"}
                    disabled={!tweetMsg}
                >Tweet</Button>
            </form>
        </>
    )
}
