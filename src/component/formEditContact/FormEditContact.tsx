import React, {useContext} from 'react';
import FormRow from "../formRow/FormRow";
import {ActionListType, Field} from "../form/Form";
import {observer} from "mobx-react";
import "./FormEditContact.scss";
import {StoreContext} from "../../App";
import {Button} from "../button/Button";
import TextMessage from "../textMessage/TextMessage";

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
        <form className="formEditContact" onSubmit={(event) => event.preventDefault()}>
            <div className="contactArea">
                <p>Данные контакта: <span>название организации, контактное лицо</span></p>
                <div>
                    {fieldListContact.map(({name, label, field}) =>
                        <FormRow className={name}
                                 label={label}
                                 field={field}
                                 key={name}
                        />
                    )}
                </div>
            </div>
            <div className="productsArea">
                <p>Продукция для печати: <span>журналы, книги, календари, бланки...</span></p>
                <div>
                    <div className="actualProductList">
                        {fieldListProducts.map(({name, label, field}) =>
                            <FormRow className={name}
                                     label={label}
                                     field={field}
                                     key={name}
                            />
                        )}
                        <div className="additionalProductList">
                            <Button onClick={contactStore.addProjectInList} text="Добавить"/>
                            {contactStore.productList.map((product) => (
                                <div key={product} className="productFromList">
                                    <Button onClick={() => contactStore.deleteRecordProductList(product)}
                                            classname="deleteRecordList imgBtn"/>
                                    {product}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="archiveProductList">
                        {fieldListProductsArchive.map(({name, label, field}) =>
                            <FormRow className={name}
                                     label={label}
                                     field={field}
                                     key={name}
                            />
                        )}
                        <div className="additionalProductList">
                            <Button onClick={contactStore.addProjectInListArchive} text="Добавить"/>
                            {contactStore.productListsArchive.map((product) => (
                                <div key={product} className="productFromList">
                                    <Button onClick={() => contactStore.deleteRecordProductListArchive(product)}
                                            classname="deleteRecordList imgBtn"/>
                                    {product}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="contactsArea">
                <p>Контактные данные: <span>телефоны, адрес электронной почты </span></p>
                <div>
                    <div className="phone">
                        {fieldListPhoneList.map(({name, label, field}) =>
                            <FormRow className={name}
                                     label={label}
                                     field={field}
                                     key={name}
                            />
                        )}
                        <div className="phoneFromList">
                            <p>Список телефонов для добавления</p>
                            {contactStore.phoneList.length
                                ? contactStore.phoneList.map((elem) => (
                                    <div key={elem.number}
                                         className={`phoneNumber ${elem.typeList.join(' ')}`}>
                                        <Button onClick={() => contactStore.deleteRecordPhoneList(elem.number)}
                                                classname="deleteRecordList imgBtn"/>
                                        <div className="number">{elem.number}</div>
                                        <div className="iconList"></div>
                                    </div>

                                ))
                                : <TextMessage className="small" message="Нет добавленных номеров."/>}
                        </div>
                    </div>

                    {fieldListEmail.map(({name, label, field}) =>
                        <FormRow className={name}
                                 label={label}
                                 field={field}
                                 key={name}
                        />
                    )}
                </div>
            </div>
            <div className="descriptionArea">
                <p>Дополнительная информация: <span></span></p>
                <div>
                    {fieldListDescription.map(({name, label, field}) =>
                        <FormRow className={name}
                                 label={label}
                                 field={field}
                                 key={name}
                        />
                    )}
                </div>
            </div>
            <div className={`reminderArea ${contactStore.newContact.reminder ? "activated" : "deactivated"}`}>
                <p>Напоминание: <span>включение напоминания, дата/время</span></p>
                <div>
                    {fieldListReminder.map(({name, label, field}) =>
                        <FormRow className={name}
                                 label={label}
                                 field={field}
                                 key={name}
                        />
                    )}
                </div>
            </div>

            <div className="actionBar">
                {actionList.map(({name, action}) =>
                    <span key={name}>{action}</span>
                )}</div>
        </form>
    );
});

export default FormEditContact;