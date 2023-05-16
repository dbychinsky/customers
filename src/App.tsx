import React, {createContext} from 'react';
import {Server} from "./service/Service";
import {RootStore} from "./store/RootStore";
import AppWrapperAuth from "./component/auth/AppWrapperAuth";

export const server = new Server();

/**
 * Создаем экземпляр родительского Store и
 * контекст для него.
 */
export const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

function App() {
    return (
        <div className="application">
            <AppWrapperAuth/>
        </div>
    );
}

export default App;
