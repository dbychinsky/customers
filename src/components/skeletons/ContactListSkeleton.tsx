import React from "react";
import styles from "./ContactListSkeleton.module.scss";

/**
 * @description Компонент загрузки данных ContactList.
 */
export function ContactListSkeleton() {
    return (
        <>
            <div className={styles.contactListSkeleton}>
                <div className={styles.contactListSkeletonCircle}></div>
                <div className={styles.contactListSkeletonRow}></div>
                <div className={styles.contactListSkeletonPhone}></div>
                <div className={styles.contactListSkeletonProduct}></div>
                <div className={styles.contactListSkeletonReminder}></div>
            </div>
            <div className={styles.contactListSkeleton}>
                <div className={styles.contactListSkeletonCircle}></div>
                <div className={styles.contactListSkeletonRow}></div>
                <div className={styles.contactListSkeletonPhone}></div>
                <div className={styles.contactListSkeletonProduct}></div>
                <div className={styles.contactListSkeletonReminder}></div>
            </div>
            <div className={styles.contactListSkeleton}>
                <div className={styles.contactListSkeletonCircle}></div>
                <div className={styles.contactListSkeletonRow}></div>
                <div className={styles.contactListSkeletonPhone}></div>
                <div className={styles.contactListSkeletonProduct}></div>
                <div className={styles.contactListSkeletonReminder}></div>
            </div>
        </>
    );
};
