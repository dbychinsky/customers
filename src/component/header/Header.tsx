import React from 'react';
import {observer} from 'mobx-react';

interface IHeader {
    title?: string;
}

const Header = observer(({title}: IHeader) => {
    return (
        <div className='header'>
            <div className='logotype'>
                <span>Contact</span>
                <span>Care & Service</span>
            </div>
        </div>
    );
});

export default Header;