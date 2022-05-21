import React, { FC } from 'react';
import styles from './App.module.css'
import { useUser } from "./hooks/useUser";
import { FeedComponent } from "./components/Feed";
import { AuthComponent } from "./components/Auth";

const App: FC = () => {
    const { user } = useUser()
    return (
        <>
            {user.uid ? (
                <div className={styles.app}>
                    <FeedComponent/>
                </div>
            ) : (
                <AuthComponent/>
            )}
        </>
    );
}

export default App;
