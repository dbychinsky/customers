import React, { ReactElement } from "react";
import styles from "components/headingH1/headingH1.module.scss";
import clsx from "clsx";

interface HeadingH1Props {
    title: string;
    icon?: ReactElement;
    className?: string;
}

/**
 * @description заголовок виджетов.
 */
export function HeadingH1({ title, icon, className }: HeadingH1Props) {
    const classWrapperHeading = clsx(styles.headingH1, className);

    return (
        <div className={classWrapperHeading}>
            <span>{title}</span>
            {icon ? icon : null}
        </div>
    );
};