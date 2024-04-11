import React from "react";
import styles from "components/products/Products.module.scss";
import { Contact } from "model/Contact";
import { HeadingH2 } from "components/headingH2/headingH2";
import { NoRecords } from "components/noRecords/NoRecords";
import clsx from "clsx";
import { ProductTables } from "components/products/productTables/ProductTables";

interface ProductsProps {
    activeContact: Contact;
    className?: string;
    isHideComments: boolean;
}

/**
 * @description Компонент отображения продукции.
 */
export function Products({ activeContact, className, isHideComments }: ProductsProps) {
    const classWrapperProducts = clsx(styles.products, className);

    return (
        <div className={classWrapperProducts}>

            <div className={styles.productActive}>
                <HeadingH2 title="Продукция в работе" className={styles.productActiveHeader} />
                {activeContact?.productList.length !== 0
                    ? <ProductTables
                        productList={activeContact.productList}
                        handleDelete={() => {
                        }}
                        isView={true}
                        isArchive={false}
                    />
                    : <NoRecords text="Продукция отсутствует" variantFontSize="small" variantAlign="left" />}
            </div>
            <div className={styles.productArchive}>
                <HeadingH2 title="Продукция в архиве" />
                {activeContact?.productListArchive.length !== 0
                    ? <ProductTables
                        productList={activeContact.productListArchive}
                        handleDelete={() => {
                        }}
                        isView={true}
                        isArchive={true}
                    />
                    : <NoRecords text="Продукция отсутствует" variantFontSize="small" variantAlign="left" />}
            </div>
        </div>
    );
};
