import React from 'react';
import styles from 'components/skeletons/ContactListSkeleton.module.scss';

/**
 * @description Компонент загрузки данных ContactList.
 */
export function ContactListSkeleton() {
    return (
        <>
            <div className={styles.contactListSkeleton}>
                <div className={styles.contactListSkeletonCircle} />
                <div className={styles.contactListSkeletonRow} />
                <div className={styles.contactListSkeletonPhone} />
                <div className={styles.contactListSkeletonProduct} />
                <div className={styles.contactListSkeletonReminder} />
            </div>
            <div className={styles.contactListSkeleton}>
                <div className={styles.contactListSkeletonCircle} />
                <div className={styles.contactListSkeletonRow} />
                <div className={styles.contactListSkeletonPhone} />
                <div className={styles.contactListSkeletonProduct} />
                <div className={styles.contactListSkeletonReminder} />
            </div>
            <div className={styles.contactListSkeleton}>
                <div className={styles.contactListSkeletonCircle} />
                <div className={styles.contactListSkeletonRow} />
                <div className={styles.contactListSkeletonPhone} />
                <div className={styles.contactListSkeletonProduct} />
                <div className={styles.contactListSkeletonReminder} />
            </div>
        </>
    );
}
