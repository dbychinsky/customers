import React from "react";
import styles from "./TableHeader.module.scss";
import { SearchingPanel } from "components/contactList/searchingPanel/SearchingPanel";
import clsx from "clsx";
import { HeadingH2 } from "components/headingH2/headingH2";

interface TableHeaderProps {
    isScrolling: boolean;
}

/**
 * @description Заголовок таблицы.
 */
export function TableHeader({ isScrolling }: TableHeaderProps) {
    const classWrapperTableHeader = clsx(styles.tableHeader, { [styles.scroll]: isScrolling });

    return (
        <div className={classWrapperTableHeader}>
            <HeadingH2 title="Список контактов" />
            <SearchingPanel />
        </div>
    );
};
