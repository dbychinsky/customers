import React from 'react';
import "./HeaderTitle.scss";

interface IH2 {
    text: string;
    className?: string;
}

const H2 = ({text, className}: IH2) => {
    return (
        <h2 className={`header2 ${className ? className : ''}`}>
            {text}
        </h2>
    );
};

export default H2;