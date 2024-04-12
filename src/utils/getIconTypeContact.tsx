import React from 'react';
import { PhoneTypeListEnum } from 'model/types';
import { ReactComponent as IconWork } from 'common/assets/icon/work.svg';
import { ReactComponent as IconHome } from 'common/assets/icon/home.svg';

export function getIconTypeContact(type: string) {
    if (type === PhoneTypeListEnum.business) {
        return <IconWork />;
    } else return <IconHome />;
}
