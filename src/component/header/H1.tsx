import React from 'react';
import "./HeaderTitle.scss";

interface IH1 {
    text: string;
    className?: string;
}

const H2 = ({text, className}: IH1) => {
    return (
        <h1 className={`header1 ${className ? className : ''}`}>
            {text}
        </h1>
    );
};

export default H2;