import React from 'react';
import "./HeaderTitle.scss";

interface IH3 {
    text: string;
    className?: string;
}

const H3 = ({text, className}: IH3) => {
    return (
        <h3 className={`header3 ${className ? className : ''}`}>
            {text}
        </h3>
    );
};

export default H3;