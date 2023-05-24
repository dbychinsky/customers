import React, {useContext} from 'react';
import FormRow from "../formRow/FormRow";
import {ActionListType, Field} from "../form/Form";
import {observer} from "mobx-react";
import "./FormEditCustomer.scss";
import {StoreContext} from "../../App";
import {Button} from "../button/Button";

/**
 * Интерфейс формы
 */
interface ICustomFormEditCustomer {
    fieldListProducts: Field[],
    fieldListProductsArchive: Field[],
    fieldListCustomer: Field[],
    fieldListPhoneList: Field[],
    fieldListEmail: Field[],
    fieldListDescription: Field[],
    fieldListReminder: Field[],
    actionList: ActionListType[]
}


/**
 * Кастомная форма редактирования
 */
const FormEditCustomer = observer(({
                                       fieldListProducts,
                                       fieldListProductsArchive,
                                       fieldListCustomer,
                                       fieldListPhoneList,
                                       fieldListEmail,
                                       fieldListDescription,
                                       fieldListReminder,
                                       actionList
                                   }: ICustomFormEditCustomer) => {

    const customerStore = useContext(StoreContext).customerStore;


    return (
        <form className="formEditCustomer" onSubmit={(event) => event.preventDefault()}>
            <div className="customerArea">
                <p>Данные заказчика: <span>название организации, контактное лицо</span></p>
                <div>
                    {fieldListCustomer.map(({name, label, field}) =>
                        <FormRow name={name}
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
                            <FormRow name={name}
                                     label={label}
                                     field={field}
                                     key={name}
                            />
                        )}
                        <div className="additionalProductList">
                            <Button onClick={customerStore.addProjectInList} text="Добавить"/>
                            {customerStore.productList.map((product) => (
                                <div key={product} className="productFromList">
                                    <Button onClick={() => customerStore.deleteRecordProductList(product)}
                                            classname="deleteRecordList imgBtn"/>
                                    {product}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="archiveProductList">
                        {fieldListProductsArchive.map(({name, label, field}) =>
                            <FormRow name={name}
                                     label={label}
                                     field={field}
                                     key={name}
                            />
                        )}
                        <div className="additionalProductList">
                            <Button onClick={customerStore.addProjectInListArchive} text="Добавить"/>
                            {customerStore.productListsArchive.map((product) => (
                                <div key={product} className="productFromList">
                                    <Button onClick={() => customerStore.deleteRecordProductListArchive(product)}
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
                            <FormRow name={name}
                                     label={label}
                                     field={field}
                                     key={name}
                            />
                        )}

                        <Button onClick={customerStore.addPhoneInList} text="Добавить"/>

                        {customerStore.phoneList.map((phone) => (
                            <div key={phone} className="phoneFromList">
                                <Button onClick={() => customerStore.deleteRecordPhoneList(phone)}
                                        classname="deleteRecordList imgBtn"/>
                                {phone}
                            </div>
                        ))}
                    </div>

                    {fieldListEmail.map(({name, label, field}) =>
                        <FormRow name={name}
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
                        <FormRow name={name}
                                 label={label}
                                 field={field}
                                 key={name}
                        />
                    )}
                </div>
            </div>
            <div className={`reminderArea ${customerStore.newCustomer.reminder ? "activated" : "deactivated"}`}>
                <p>Напоминание: <span>включение напоминания, дата/время</span></p>
                <div>
                    {fieldListReminder.map(({name, label, field}) =>
                        <FormRow name={name}
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

export default FormEditCustomer;