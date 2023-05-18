import React from 'react';
import "./HeaderTitle.scss";

interface IH4 {
    text: string;
    className?: string;
}

const H4 = ({text, className}: IH4) => {
    return (
        <h4 className={`header4 ${className ? className : ''}`}>
            {text}
        </h4>
    );
};

export default H4;