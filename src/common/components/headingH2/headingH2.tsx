import React from "react";
import styles from "./headingH2.module.scss";

interface IHeadingH2Props {
    title: string;
    icon?: string;
}

/**
 * @description заголовок виджетов.
 */
export const HeadingH2 = ({ title, icon }: IHeadingH2Props) => {
    return (
        <div className={styles.headingH2}>
            <span>{title}</span>
            {icon ? <img src={icon} className={styles.icon} alt="icon" /> : null}
        </div>
    );
};