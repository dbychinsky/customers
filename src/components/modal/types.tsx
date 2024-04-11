import { ReactElement, ReactPortal } from "react";

/**
 * Интерфейс компонента Modal.
 */
export interface ModalProps {
    /**
     * Компонент, который необходимо отрисовать в модальном окне.
     */
    children: ReactElement;
    /**
     * Функция закрытия модального окна.
     */
    closeModal?: () => void;
    /**
     * Значение, которое определяет закрытие модального окна
     * при клике на backdrop (тёмный фон).
     */
    closeBackdropClick?: boolean;
}

/**
 * Интерфейс пропсов хука useModal.
 */
export interface UseModalProps {
    /**
     * Заголовок модального окна.
     */
    title: string;
    /**
     * Функция подтверждения действия.
     */
    submitHandler?: () => void;
    /**
     * Заголовок кнопки подтверждения действия.
     */
    submitButtonTitle?: string;
    /**
     * Функция отмены действия.
     */
    cancelHandler?: () => void;
    /**
     * Пропс, позволяющий отображать кнопку отмены действия.
     */
    withCancelButton?: boolean;
    /**
     * Заголовок кнопки отмены действия.
     */
    cancelButtonTitle?: string;
    /**
     * Компонент, который будет отрисован в модальном окне.
     */
    children?: ReactElement;
    /**
     * Значение, определяющее исполняется ли функция подтверждения действия (запрос на сервер).
     */
    isSubmitting?: boolean;
    /**
     * Значение, определяющее наименование модального окна во время исполнения функции
     * подтверждения действия.
     */
    submittingTitle?: string;
    /**
     * Значение, определяющее фокус на кнопке сабмита при открытии модального окна.
     */
    isActiveSubmitButton?: boolean;
    /**
     * Значение, определяющее фокус на кнопке отмены при открытии модального окна.
     */
    isActiveCancelButton?: boolean;
    /**
     * Функция, которая вызывается при размонтировании компонента модального окна.
     */
    onCloseModal?: () => void;
    /**
     * Значение, которое определяет закрытие модального окна
     * при клике на backdrop (тёмный фон).
     */
    closeBackdropClick?: boolean;
}

/**
 * Тип данных, который возвращает хук "useModal".
 */
export type UseModalReturnType = [
    (props: UseModalProps) => ReactPortal | null,
    (callback?: () => void) => void,
    () => void,
    boolean,
];
