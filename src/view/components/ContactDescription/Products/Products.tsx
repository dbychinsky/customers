import React from "react";
import styles from "./Products.module.scss";
import { Contact } from "model/Contact";
import { HeadingH2 } from "common/components/headingH2/headingH2";

interface IProductsProps {
    activeContact: Contact | undefined;
}

/**
 * @description Компонент отображения продукции.
 */
export const Products = ({ activeContact }: IProductsProps) => {
    return (
        <div className={styles.products}>
            <div className={styles.productActive}>
                <HeadingH2 title="Продукты" />
                {activeContact?.productList.map((product) => (
                    <div key={product.productName}>
                        <div>{product.productName}</div>
                        <div>{product.productComment}</div>
                    </div>
                ))}
            </div>
            <div className={styles.productArchive}>
                <HeadingH2 title="Продукты в архиве" />
                {activeContact?.productListArchive.map((product) => (
                    <div key={product.productName}>
                        <div>{product.productName}</div>
                        <div>{product.productComment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
