import React, {useState} from 'react';
import {RouterPathList} from "../../router/RouterPathList";
import {NavLink} from "react-router-dom";


const Navigation = () => {
    const [isViewNav, setIsViewNav] = useState<boolean>(false);

    const handleIsOpen = () => {
        setIsViewNav(!isViewNav)
    }

    return (
        <div className={`navigation ${isViewNav ? 'open' : 'close'}`}>

            <div className="openNavi"
                 onClick={handleIsOpen}>open
            </div>

            <ul>
                <li>
                    <NavLink to={RouterPathList.DASHBOARD_PAGE}
                             className="actionContactListPage"
                             title="CONTACT_LIST_PAGE">
                        Контакты
                    </NavLink>
                </li>
                <li>
                    <NavLink to={RouterPathList.DASHBOARD_PAGE}
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