import { useNavigateHelper } from 'router/hooks/useNavigateHelper';

interface UseRedirectInLoginPage {
    isAuth: boolean;
}

/**
 * @description Редирект на неавторизованную страницу.
 * @param isAuth - Флаг авторизации.
 */
export function useRedirectInLoginPage({ isAuth }: UseRedirectInLoginPage) {
    const { navigateToLoginPage } = useNavigateHelper();
    const redirectToLoginPage = () => {
        if (!isAuth) {
            navigateToLoginPage();
        }
    };

    return {
        redirectToLoginPage,
    };
}
