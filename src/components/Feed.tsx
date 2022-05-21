import { memo } from "react";
import { auth} from '../firebase'

const Feed = () => {
    return (
        <div>
            Feed
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}

export const FeedComponent = memo(Feed)