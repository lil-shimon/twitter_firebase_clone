import styles from "./TweetInput.module.css"
import { useUser } from "../hooks/useUser";
import { Avatar } from "@material-ui/core";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

export const TweetInput = () => {
    const { user } = useUser()
    const { signOut } = useFirebaseAuth()
    return (
        <div>
            <Avatar
                className={styles.tweet_avatar}
                src={user.photoUrl}
                onClick={signOut}
            />
        </div>
    )
}
