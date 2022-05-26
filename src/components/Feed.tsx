import { memo } from "react";
import { auth} from '../firebase'
import { TweetInput } from "./TweetInput";

const Feed = () => {
    return (
        <div>
            Feed
            <TweetInput />
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}

export const FeedComponent = memo(Feed)