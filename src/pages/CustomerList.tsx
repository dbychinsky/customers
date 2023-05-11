import React, {useEffect, useState} from 'react';
import {server} from "../App";
import {Posts} from "../model/Posts";

const CustomerList = () => {

    const [customer, setCustomer] = useState<Posts[]>([new Posts()]);
    const [newCustomer, setNewCustomer] = useState<Posts>(new Posts());

    function sendToStateEmployeeList(e: React.ChangeEvent<HTMLInputElement>): void {
        setNewCustomer({...newCustomer, [e.target.name]: e.target.value});

    }

    const push = () => {
        server.pushCustomerList(newCustomer).then();
        server.getCustomerList()
            .then(response => {
                setCustomer(response)
            });
    }

    useEffect(() => {
        server.getCustomerList()
            .then(response => {
                setCustomer(response)
            });
    }, [])

    return (
        <div>
            <input
                type="text"
                value={newCustomer.title}
                onInput={sendToStateEmployeeList}
                name={"title"}
            />
            <button onClick={push}>add</button>

            {customer?.map(({id, title, content}) => (
                <div key={id}>{title}</div>
            ))}

        </div>
    );
};

export default CustomerList;