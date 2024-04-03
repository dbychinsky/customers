import React from "react";
import styles from "./Products.module.scss";
import { Contact } from "model/Contact";
import { HeadingH2 } from "components/headingH2/headingH2";
import { NoRecords } from "components/noRecords/NoRecords";
import clsx from "clsx";

interface IProductsProps {
    activeContact: Contact;
    className?: string;
    isHideComments: boolean;
}

/**
 * @description Компонент отображения продукции.
 */
export const Products = ({ activeContact, className, isHideComments }: IProductsProps) => {
    const classWrapperProducts = clsx(styles.products, className);

    return (
        <div className={classWrapperProducts}>
            {/*<div className={styles.productActive}>*/}
            {/*    {activeContact ?*/}
            {/*        <>*/}
            {/*            <HeadingH2 title="Продукция" />*/}
            {/*            {activeContact.productList.length !== 0*/}
            {/*                ? activeContact.productList.map((product) => (*/}
            {/*                    <div key={product.productName} className={styles.productNameActive}>*/}
            {/*                        {product.productName}*/}
            {/*                        {isHideComments*/}
            {/*                            ? product.productComment*/}
            {/*                            : null}*/}
            {/*                    </div>*/}
            {/*                ))*/}
            {/*                : <NoRecords text="Продукция отсутствует" variantFontSize="small" variantAlign="left" />*/}
            {/*            }*/}
            {/*        </> :*/}
            {/*        null*/}
            {/*    }*/}
            {/*</div>*/}
            <div className={styles.productActive}>
                <HeadingH2 title="Продукция в архиве" className={styles.productActiveHeader}/>
                {activeContact?.productList.map((product) => (
                    <div key={product.productName} className={styles.productRow}>
                        <td className={styles.productName}>{product.productName}</td>
                        <td className={styles.productComment}>{product.productComment}</td>
                    </div>
                ))}
            </div>
            <div className={styles.productArchive}>
                <HeadingH2 title="Продукция в архиве" />
                {activeContact?.productListArchive.length !== 0
                    ? activeContact?.productListArchive.map((product) => (
                        <div key={product.productName} className={styles.productNameArchive}>
                            {product.productName}
                            {isHideComments
                                ? product.productComment
                                : null}
                        </div>
                    ))
                    : <NoRecords text="Продукция отсутствует" variantFontSize="small" variantAlign="left" />}
            </div>
        </div>
    );
};
