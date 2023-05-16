import React from 'react';
import "./HeaderTitle.scss";

interface Ih3 {
    text: string;
    className?: string;
}

const H3 = ({text, className}: Ih3) => {
    return (
        <h1 className={`h3 ${className ? className : ''}`}>
            {text}
        </h1>
    );
};

export default H3;