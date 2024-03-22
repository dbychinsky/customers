import React, {useContext} from 'react';
import {ActionListType, Field} from '../form/Form';
import {observer} from 'mobx-react';
import {StoreContext} from '../../App';
import {Button} from '../../components/button/Button';
import TextMessage from '../textMessage/TextMessage';
import {FormRow} from 'components/formRow/FormRow';

/**
 * Интерфейс формы
 */
interface ICustomFormEditContact {
    fieldListProducts: Field[],
    fieldListProductsArchive: Field[],
    fieldListContact: Field[],
    fieldListPhoneList: Field[],
    fieldListEmail: Field[],
    fieldListDescription: Field[],
    fieldListReminder: Field[],
    actionList: ActionListType[]
}


/**
 * Кастомная форма редактирования
 */
const FormEditContact = observer(({
                                      fieldListProducts,
                                      fieldListProductsArchive,
                                      fieldListContact,
                                      fieldListPhoneList,
                                      fieldListEmail,
                                      fieldListDescription,
                                      fieldListReminder,
                                      actionList
                                  }: ICustomFormEditContact) => {

    const contactStore = useContext(StoreContext).contactStore;


    return (
        <form className='formEditContact' onSubmit={(event) => event.preventDefault()}>
            <div className='contactArea'>
                <p>Данные контакта: <span>название организации, контактное лицо</span></p>
                <div>
                    {/*{fieldListContact.map(({name, label, field}) =>*/}
                    {/*    <FormRow className={name}*/}
                    {/*             label={label}*/}
                    {/*             field={field}*/}
                    {/*             key={name}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </div>
            <div className='productsArea'>
                <p>Продукция для печати: <span>журналы, книги, календари, бланки...</span></p>
                <div>
                    <div className='actualProductList'>
                        {/*{fieldListProducts.map(({name, label, field}) =>*/}
                        {/*    <FormRow className={name}*/}
                        {/*             label={label}*/}
                        {/*             field={field}*/}
                        {/*             key={name}*/}
                        {/*    />*/}
                        {/*)}*/}
                        <div className='additionalProductList'>
                            <Button onClick={contactStore.addProjectInList} text='Добавить'/>
                            {contactStore.productList.map((product) => (
                                <div key={product} className='productFromList'>
                                    <Button text='dsdsd' onClick={() => contactStore.deleteRecordProductList(product)}
                                            className='deleteRecordList imgBtn'/>
                                    {product}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className='archiveProductList'>
                        {/*{fieldListProductsArchive.map(({name, label, field}) =>*/}
                        {/*    <FormRow className={name}*/}
                        {/*             label={label}*/}
                        {/*             field={field}*/}
                        {/*             key={name}*/}
                        {/*    />*/}
                        {/*)}*/}
                        <div className='additionalProductList'>
                            <Button onClick={contactStore.addProjectInListArchive} text='Добавить'/>
                            {contactStore.productListsArchive.map((product) => (
                                <div key={product} className='productFromList'>
                                    <Button text='dsdsd'
                                            onClick={() => contactStore.deleteRecordProductListArchive(product)}
                                            className='deleteRecordList imgBtn'/>
                                    {product}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='contactsArea'>
                <p>Контактные данные: <span>телефоны, адрес электронной почты </span></p>
                <div>
                    <div className='phone'>
                        {/*{fieldListPhoneList.map(({name, label, field}) =>*/}
                        {/*    <FormRow className={name}*/}
                        {/*             label={label}*/}
                        {/*             field={field}*/}
                        {/*             key={name}*/}
                        {/*    />*/}
                        {/*)}*/}
                        <div className='phoneFromList'>
                            <p>Список телефонов для добавления</p>
                            {contactStore.phoneList.length
                                ? contactStore.phoneList.map((elem) => (
                                    <div key={elem.number}
                                         className={`phoneNumber ${elem.typeList.join(' ')}`}>
                                        <Button text='dsdsd'
                                                onClick={() => contactStore.deleteRecordPhoneList(elem.number)}
                                                className='deleteRecordList imgBtn'/>
                                        <div className='number'>{elem.number}</div>
                                        <div className='iconList'></div>
                                    </div>

                                ))
                                : <TextMessage className='small' message='Нет добавленных номеров.'/>}
                        </div>
                    </div>

                    {/*{fieldListEmail.map(({name, label, field}) =>*/}
                    {/*    <FormRow className={name}*/}
                    {/*             label={label}*/}
                    {/*             field={field}*/}
                    {/*             key={name}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </div>
            <div className='descriptionArea'>
                <p>Дополнительная информация: <span></span></p>
                <div>
                    {/*{fieldListDescription.map(({name, label, field}) =>*/}
                    {/*    <FormRow className={name}*/}
                    {/*             label={label}*/}
                    {/*             field={field}*/}
                    {/*             key={name}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </div>
            <div className={`reminderArea ${contactStore.newContact.reminder ? 'activated' : 'deactivated'}`}>
                <p>Напоминание: <span>включение напоминания, дата/время</span></p>
                <div>
                    {/*{fieldListReminder.map(({name, label, field}) =>*/}
                    {/*    <FormRow className={name}*/}
                    {/*             label={label}*/}
                    {/*             field={field}*/}
                    {/*             key={name}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </div>

            <div className='actionBar'>
                {actionList.map(({name, action}) =>
                    <span key={name}>{action}</span>
                )}</div>
        </form>
    );
});

export default FormEditContact;