import React from "react";
import styles from "components/feedbackMessageField/FeedbackMessageField.module.scss";

interface FeedbackMessageFieldProps {
    /**
     * @description Текст.
     */
    message: string | undefined,
}

export function FeedbackMessageField({ message }: FeedbackMessageFieldProps) {
    return (
        <div className={styles.feedbackMessageField}>
            {message}
        </div>
    );
};