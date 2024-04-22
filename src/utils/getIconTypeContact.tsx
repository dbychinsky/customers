import React from 'react';
import { ReactComponent as IconWork } from 'common/assets/icon/work.svg';
import { ReactComponent as IconHome } from 'common/assets/icon/home.svg';
import { PhoneTypeListEnum } from 'store/contactEditStore/types';

export function getIconTypeContact(type: string) {
    if (type === PhoneTypeListEnum.business) {
        return <IconWork />;
    } else return <IconHome />;
}
