import React, {ReactNode} from 'react';
interface ITextMessage {
    message?: string,
    child?: ReactNode,
    className: string
}

/**
 * Вывод сообщения на страницу
 * @constructor
 */
const TextMessage = ({message, child, className}: ITextMessage) => {
    return (
        <div className={`textMessage ${className}`}>
            <div>{message}</div>
            {child}
        </div>
    );
};

export default TextMessage;