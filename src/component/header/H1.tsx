import React from 'react';
import "./HeaderTitle.scss";

interface Ih1 {
    text: string;
    className?: string;
}

const H1 = ({text, className}: Ih1) => {
    return (
        <h1 className={`header1 ${className ? className : ''}`}>
            {text}
        </h1>
    );
};

export default H1;