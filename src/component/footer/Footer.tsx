import React from 'react';
import "./Footer.scss";
import {GetDate} from "../../utility/GetDate";

const Footer = () => {
    const date = new Date();

    return (
        <div className="footer">
            <p>{`Copyright ${GetDate.dateSerializeYY(date.toLocaleString())}`}</p>
        </div>
    );
};

export default Footer;