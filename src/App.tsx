import React, {createContext} from 'react';
import AppWrapperInAuth from './AppWrapperInAuth';
import {Server} from 'service/Service';
import {RootStore} from 'store/RootStore';
import styles from 'index.module.scss';

export const server = new Server();

/**
 * @description Создаем экземпляр родительского Store и
 * контекст для него.
 */
export const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

function App() {
    return (
        <div className={styles.application}>
            <AppWrapperInAuth/>
        </div>
    );
}

export default App;
