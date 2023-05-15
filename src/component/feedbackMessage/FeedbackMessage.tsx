import React from 'react';
import "./FeedbackMessage.scss";

interface IFeedbackMessage {
    /**
     * Поле
     */
    message: string | undefined
}

const FeedbackMessage = ({message}: IFeedbackMessage) => {

    const messageContent = <div className="errorMessage">{message}</div>

    return (
        <div className="feedbackMessage">
            {message ? messageContent : undefined}
        </div>
    );
};

export default FeedbackMessage;