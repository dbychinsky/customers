import React, { useEffect } from 'react';
import styles from 'components/createContact/addProductList/AddProductList.module.scss';
import { ContactEditStore } from 'store/ContactEditStore';
import { HeadingH2 } from 'components/headingH2/headingH2';
import { useStores } from 'store/RootStoreContext';
import { InputSelect } from 'components/inputSelect/InputSelect';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ReactComponent as Add } from 'common/assets/icon/add.svg';
import { ReactComponent as Clear } from 'common/assets/icon/clear.svg';
import { TextAreaField } from 'components/textAreaField/TextAreaField';
import { observer } from 'mobx-react';
import { InputFieldEnum } from 'components/inputField/types';
import { InputField } from 'components/inputField/InputField';
import { ProductTables } from 'components/products/productTables/ProductTables';

interface AddProductListProps {
    contactEditStore: ContactEditStore;
}

/**
 * @description Добавление продуктов.
 */
export const AddProductList = observer(({ contactEditStore }: AddProductListProps) => {
    const { productListStore } = useStores();

    useEffect(() => {
        productListStore.getProductList();
    }, [productListStore]);

    return (
        <div className={styles.addProductList}>
            <div className={styles.active}>
                <HeadingH2 title='Список продукции в работе' />
                <div className={styles.contactFields}>
                    <InputSelect
                        changeHandler={contactEditStore.handleChangeFieldsProduct}
                        valueList={productListStore.productList}
                        value={contactEditStore.productFields.productName}
                        name='productName'
                    />
                    <InputField
                        value={contactEditStore.productNameField}
                        changeHandler={contactEditStore.handleChangeFieldProduct}
                        name='productNameField'
                        type={InputFieldEnum.text}
                        mask={false}
                        maxLength={20}
                        className={styles.productNameField}
                    />
                    <TextAreaField
                        value={contactEditStore.productFields.productComment}
                        changeHandler={contactEditStore.handleChangeFieldsProduct}
                        name='productComment'
                        placeHolder='Комментарий к продукции'
                        className={styles.fieldArea}
                    />
                    <div className={styles.actions}>
                        <ButtonImage
                            onClick={onClickClearFields}
                            image={<Clear />}
                            onlyImage={true}
                            className={styles.iconClear}
                            variant='clear'
                        />
                        <ButtonImage
                            onClick={onClickAddProduct}
                            image={<Add />}
                            onlyImage={true}
                            className={styles.iconAdd}
                            variant='add'
                            isDisabled={contactEditStore.isDisableButtonAddProducts()}
                        />
                    </div>
                </div>
                <div className={styles.productList}>
                    {contactEditStore.productList.length ? (
                        <ProductTables
                            productList={contactEditStore.productList}
                            handleDelete={handleDelete}
                            isView={false}
                            isArchive={false}
                        />
                    ) : null}
                </div>
            </div>
            <div className={styles.archive}>
                <HeadingH2 title='Список продукции в архиве' />
                <div className={styles.contactFields}>
                    <InputSelect
                        changeHandler={contactEditStore.handleChangeFieldsProductArchive}
                        valueList={productListStore.productList}
                        value={contactEditStore.productFieldsArchive.productName}
                        name='productName'
                    />
                    <InputField
                        value={contactEditStore.productNameFieldArchive}
                        changeHandler={contactEditStore.handleChangeFieldProductArchive}
                        name='productNameField'
                        type={InputFieldEnum.text}
                        mask={false}
                        maxLength={20}
                        className={styles.productNameField}
                    />
                    <TextAreaField
                        value={contactEditStore.productFieldsArchive.productComment}
                        changeHandler={contactEditStore.handleChangeFieldsProductArchive}
                        name='productComment'
                        placeHolder='Комментарий к продукции'
                        className={styles.fieldArea}
                    />
                    <div className={styles.actions}>
                        <ButtonImage
                            onClick={onClickClearFieldsArchive}
                            image={<Clear />}
                            onlyImage={true}
                            className={styles.iconClear}
                            variant='clear'
                        />
                        <ButtonImage
                            onClick={onClickAddProductArchive}
                            image={<Add />}
                            onlyImage={true}
                            className={styles.iconAdd}
                            variant='add'
                            isDisabled={contactEditStore.isDisableButtonAddProductsArchive()}
                        />
                    </div>
                </div>
                <div className={styles.productList}>
                    {contactEditStore.productListArchive.length ? (
                        <ProductTables
                            productList={contactEditStore.productListArchive}
                            handleDelete={handleDeleteArchive}
                            isView={false}
                            isArchive={true}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );

    function onClickAddProduct(): void {
        contactEditStore.setProductList();
    }

    function onClickAddProductArchive(): void {
        contactEditStore.setProductListArchive();
    }

    function onClickClearFields(): void {
        contactEditStore.clearFieldsProduct();
    }

    function onClickClearFieldsArchive(): void {
        contactEditStore.clearFieldsProductArchive();
    }

    function handleDelete(id: string) {
        contactEditStore.deleteFromProductList(id);
    }

    function handleDeleteArchive(id: string) {
        contactEditStore.deleteFromProductListArchive(id);
    }
});
