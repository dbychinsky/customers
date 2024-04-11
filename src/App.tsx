import React from "react";
import { Server } from "service/Service";
import { RootStore } from "store/RootStore";
import styles from "index.module.scss";
import { RootStoreContext } from "store/RootStoreContext";
import { RoutersProject } from "router/RouterList";

export const server = new Server();

/**
 * @description Создаем экземпляр родительского Store и
 * контекст для него.
 */
function App() {
    return (
        <RootStoreContext.Provider value={new RootStore()}>
            <div className={styles.application}>
                <RoutersProject />
            </div>
        </RootStoreContext.Provider>
    );
}

export default App;
