import React from 'react';

const ScrollTop = () => {

    const scrollUp = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="scrollTop"
             onClick={scrollUp}>up</div>
    );
};

export default ScrollTop;