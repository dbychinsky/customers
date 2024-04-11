import React, { ReactElement } from "react";
import styles from "./headingH2.module.scss";
import clsx from "clsx";

interface HeadingH2Props {
    title: string;
    icon?: ReactElement;
    className?: string;
}

/**
 * @description заголовок виджетов.
 */
export function HeadingH2({ title, icon, className }: HeadingH2Props) {
    const classWrapperHeading = clsx(styles.headingH2, className);

    return (
        <div className={classWrapperHeading}>
            <span>{title}</span>
            {icon ? icon : null}
        </div>
    );
};