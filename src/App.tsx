import React from 'react';
import CustomerList from "./pages/CustomerList";
import {Server} from "./service/Service";

export const server = new Server();

function App() {
    return (
        <div className="application">
            <CustomerList/>
        </div>
    );
}

export default App;
