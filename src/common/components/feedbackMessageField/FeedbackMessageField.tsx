import React from "react";
import styles from "common/components/feedbackMessageField/FeedbackMessageField.module.scss";

interface IFeedbackMessageFieldProps {

    /**
     * @description Текст.
     */
    message: string | undefined,
}

export const FeedbackMessageField = ({message}: IFeedbackMessageFieldProps) => {
    return (
        <div className={styles.feedbackMessageField}>
            {message}
        </div>
    );
};