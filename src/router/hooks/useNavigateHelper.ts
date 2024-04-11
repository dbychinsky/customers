import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RouterPathList } from "router/RouterPathList";

/**
 * Хук с готовыми функциями для использования навигации по роутам приложения.
 *
 * @see UseNavigateHelperReturnType
 */

/* eslint-disable react-hooks/exhaustive-deps */
export function useNavigateHelper(): UseNavigateHelperReturnType {
    const navigate = useNavigate();

    const navigateToLoginPage = useCallback(() => navigate(RouterPathList.LOGIN_PAGE), []);
    const navigateToDashboardPage = useCallback(() => navigate(RouterPathList.DASHBOARD_PAGE), []);
    const navigateToCurrencyPage = useCallback(() => navigate(RouterPathList.CURRENCY_PAGE), []);
    const navigateToCreateContactPage = useCallback(() => navigate(RouterPathList.CREATE_CONTACT_PAGE), []);
    const navigateToPreviousPage = () => navigate(-1);

    return {
        navigateToPreviousPage,
        navigateToLoginPage: navigateToLoginPage,
        navigateToDashboardPage: navigateToDashboardPage,
        navigateToCurrencyPage: navigateToCurrencyPage,
        navigateToCreateContactPage: navigateToCreateContactPage,
    };
}

/**
 * Тип функций-хелперов хука "useNavigateHelper".
 *
 * @see useNavigateHelper
 * @see UseNavigateHelperReturnType
 */
type NavigateHelperType = () => void;

/**
 * Тип данных, возвращаемый хуком "useNavigateHelper".
 *
 * @see useNavigateHelper
 * @see NavigateHelperType
 */
type UseNavigateHelperReturnType = {
    /**
     * Функция, перенаправляющая пользователя предыдущую страницу.
     */
    navigateToPreviousPage: NavigateHelperType;
    /**
     * Функция, перенаправляющая пользователя на страницу логирования.
     */
    navigateToLoginPage: NavigateHelperType;
    /**
     * Функция, перенаправляющая пользователя на главную страницу - Dashboard.
     */
    navigateToDashboardPage: NavigateHelperType;
    /**
     * Функция, перенаправляющая пользователя на главную страницу - Currency.
     */
    navigateToCurrencyPage: NavigateHelperType;
    /**
     * Функция, перенаправляющая пользователя на страницу создания контакта CreateContactPage.
     */
    navigateToCreateContactPage: NavigateHelperType
};
