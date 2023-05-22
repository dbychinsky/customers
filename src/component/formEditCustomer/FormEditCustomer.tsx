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
    fieldListContacts: Field[],
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
                                       fieldListContacts,
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
                        <div>
                            {fieldListProducts.map(({name, label, field}) =>
                                <FormRow name={name}
                                         label={label}
                                         field={field}
                                         key={name}
                                />
                            )}
                        </div>
                        <div className="additionalProductList">
                            <Button onClick={customerStore.addProjectInList} text="Добавить"/>
                            {customerStore.productLists.map(({id, name}) => (
                                <div key={id} className="additionalProduct">
                                    {name ? <Button onClick={() => customerStore.deleteRecordProductList(id)}
                                                    classname="deleteProduct imgBtn"
                                                    text="del"/> : ''}
                                    <p className="productName">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="archiveProductList">
                        <div>
                            {fieldListProductsArchive.map(({name, label, field}) =>
                                <FormRow name={name}
                                         label={label}
                                         field={field}
                                         key={name}
                                />
                            )}
                        </div>
                        <div className="additionalProductList">
                            <Button onClick={customerStore.addProjectInListArchive} text="Добавить"/>
                            {customerStore.productListsArchive.map(({id, name}) => (
                                <div key={id} className="additionalProduct">
                                    {name ? <Button onClick={() => customerStore.deleteRecordProductListArchive(id)}
                                                    classname="deleteProduct imgBtn"
                                                    text="del"/> : ''}
                                    <p className="productName">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="contactsArea">
                <p>Контактные данные: <span>телефоны, адрес электронной почты </span></p>
                <div>
                    {fieldListContacts.map(({name, label, field}) =>
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