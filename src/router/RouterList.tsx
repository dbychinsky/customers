import React from 'react';
import { Route, Routes } from 'react-router';
import { RouterPathList } from 'router/RouterPathList';
import { DashboardPage } from 'pages/DashboardPage/DashboardPage';
import { CurrencyPage } from 'pages/CurrencyPage/CurrencyPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { Layout } from 'Layout';
import { CalendarPage } from 'pages/CalendarPage/CalendarPage';
import { CreateContactPage } from 'pages/CreateContactPage/CreateContactPage';

/**
 * @description Роутинг приложения.
 */
export const RoutersProject = () => (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path={RouterPathList.LOGIN_PAGE} element={<LoginPage />} />
            <Route path={RouterPathList.CALENDAR_PAGE} element={<CalendarPage />} />
            <Route path={RouterPathList.CURRENCY_PAGE} element={<CurrencyPage />} />
            <Route path={RouterPathList.CREATE_CONTACT_PAGE} element={<CreateContactPage />} />
            <Route path={`${RouterPathList.EDIT_CONTACT_PAGE}/:idContact`} element={<CreateContactPage />} />
        </Route>
    </Routes>
);
