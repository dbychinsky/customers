import React from 'react';
import styles from 'components/scrollTop/ScrollTop.module.scss';
import { ReactComponent as IconArrowPageUp } from 'common/assets/icon/arrowPageUp.svg';

export const ScrollTop = () => {
    const scrollUp = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles.scrollTop} onClick={scrollUp}>
            <IconArrowPageUp />
        </div>
    );
};
