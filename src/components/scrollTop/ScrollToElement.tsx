import React from 'react';
import styles from 'components/scrollTop/ScrollToElement.module.scss';
import { ReactComponent as IconArrowPageUp } from 'common/assets/icon/arrowPageUp.svg';

export const ScrollToElement = () => {
    const scrollUp = () => {
        window.scrollTo(0, 0);
    };

    const scrollDown = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    return (
        <div className={styles.scrollToElement}>
            <div className={styles.scrollTop} onClick={scrollUp}>
                <IconArrowPageUp />
            </div>
            <div className={styles.scrollDown} onClick={scrollDown}>
                <IconArrowPageUp />
            </div>
        </div>
    );
};
