import {useNavigateHelper} from 'router/hooks/useNavigateHelper';

interface IUseRedirectInLoginPage {
    isAuth: boolean
}

/**
 * @description Редирект на неавторизованную страницу.
 * @param isAuth - Флаг авторизации.
 */
export function useRedirectInLoginPage({isAuth}: IUseRedirectInLoginPage) {
    const {navigateToLoginPage} = useNavigateHelper();
    const redirectToLoginPage = () => {
        if (!isAuth) {
            navigateToLoginPage();
        }
    };

    return {
        redirectToLoginPage
    }
};
