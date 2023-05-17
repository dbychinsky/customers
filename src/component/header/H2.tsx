import React from 'react';
import "./HeaderTitle.scss";

interface Ih2 {
    text: string;
    className?: string;
}

const H2 = ({text, className}: Ih2) => {
    return (
        <h2 className={`header2 ${className ? className : ''}`}>
            {text}
        </h2>
    );
};

export default H2;