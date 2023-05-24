import React, {ReactNode} from 'react';
import "./FeedbackMessage.scss";

interface IFeedbackMessage {
    /**
     * Поле
     */
    message: string | undefined,

    /**
     * Тип
     */
    typeMessage: FeedbackMessageList
}

export enum FeedbackMessageList {
    error = "ошибка",
    inform = "информация"
}

const FeedbackMessage = ({message, typeMessage}: IFeedbackMessage) => {
    let result: ReactNode = <div>empty</div>;

    const layoutMessage = (): ReactNode => {
        switch (typeMessage) {
            case FeedbackMessageList.error:
                result = <div className="errorMessage">{message}</div>
                break;
            case FeedbackMessageList.inform:
                result = <div className="informMessage">{message}</div>
                break;
        }
        return result
    }

    return (
        <div className="feedbackMessage">

            {message ? layoutMessage() : undefined}
        </div>
    );
};

export default FeedbackMessage;