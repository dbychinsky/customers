import React from 'react';
import {RouterPathList} from "../../router/RouterPathList";
import {NavLink} from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="logotype">
                <span>Customer</span>
                <span>Care & Service</span>
            </div>
            <ul>
                <li>
                    <NavLink to={RouterPathList.CUSTOMER_LIST_PAGE}
                             className="actionCustomerListPage"
                             title="CUSTOMER_LIST_PAGE">
                        Заказчики
                    </NavLink>
                </li>
                <li>
                    <NavLink to={RouterPathList.CUSTOMER_LIST_REMINDER_PAGE}
                             className="actionCustomerListReminderPage"
                             title="CUSTOMER_LIST_REMINDER_PAGE">
                        Нотификации
                    </NavLink>
                </li>
                <li>
                    <NavLink to={RouterPathList.CUSTOMER_EDIT_PAGE}
                             className="settingPage"
                             title="CUSTOMER_LIST_REMINDER_PAGE">
                        Настройки
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;