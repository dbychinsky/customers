import React from 'react';
import styles from 'components/feedbackMessageField/FeedbackMessageField.module.scss';

interface FeedbackMessageFieldProps {
    message: string | undefined;
}

/**
 * @description Компонент отображения дополнительного текста.
 */
export function FeedbackMessageField({ message }: FeedbackMessageFieldProps) {
    return <div className={styles.feedbackMessageField}>{message}</div>;
}
