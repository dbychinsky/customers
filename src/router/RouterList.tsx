import React from "react";
import { Route, Routes } from "react-router";
import { RouterPathList } from "./RouterPathList";
import { DashboardPage } from "view/DashboardPage/DashboardPage";
import { CurrencyPage } from "view/CurrencyPage/CurrencyPage";
import { LoginPage } from "view/LoginPage/LoginPage";
import { Layout } from "Layout";
import { CalendarPage } from "view/CalendarPage/CalendarPage";

/**
 * @description Роутинг приложения
 */
export const RoutersProject = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path={RouterPathList.LOGIN_PAGE} element={<LoginPage />} />
                <Route path={RouterPathList.CALENDAR_PAGE} element={<CalendarPage />} />
                <Route path={RouterPathList.CURRENCY_PAGE} element={<CurrencyPage />} />
            </Route>
        </Routes>
    );
};
