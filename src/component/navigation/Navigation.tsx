import React from 'react';
import {RouterPathList} from "../../router/RouterPathList";
import {NavLink} from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="logotype">
                <span>Contact</span>
                <span>Care & Service</span>
            </div>
            <ul>
                <li>
                    <NavLink to={RouterPathList.CONTACT_LIST_PAGE}
                             className="actionContactListPage"
                             title="CONTACT_LIST_PAGE">
                        Контакты
                    </NavLink>
                </li>
                <li>
                    <NavLink to={RouterPathList.CONTACT_LIST_REMINDER_PAGE}
                             className="actionContactListReminderPage"
                             title="CONTACT_LIST_REMINDER_PAGE">
                        Нотификации
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;