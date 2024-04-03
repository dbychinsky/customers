import React, { ReactElement } from "react";
import styles from "./headingH2.module.scss";
import clsx from "clsx";

interface IHeadingH2Props {
    title: string;
    icon?: ReactElement;
    className?: string;
}

/**
 * @description заголовок виджетов.
 */
export const HeadingH2 = ({ title, icon, className }: IHeadingH2Props) => {
    const classWrapperHeading = clsx(styles.headingH2, className);

    return (
        <div className={classWrapperHeading}>
            <span>{title}</span>
            {icon ? icon : null}
        </div>
    );
};