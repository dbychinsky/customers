import React from 'react';
import styles from 'components/products/productTables/ProductTables.module.scss';
import { ButtonImage } from 'components/buttonImage/ButtonImage';
import { ProductType } from 'model/types';
import { ReactComponent as Delete } from 'common/assets/icon/delete.svg';
import clsx from 'clsx';
import { observer } from 'mobx-react';

interface ProductTablesProps {
    productList: ProductType[];
    handleDelete: (id: string) => void;
    isView: boolean;
    isArchive: boolean;
}

/**
 * @description Компонент отображения продукции - таблица.
 */
export const ProductTables = observer(({ productList, handleDelete, isView, isArchive }: ProductTablesProps) => {
    const classWrapperProductTable = clsx(styles.productTable, { [styles.isArchive]: isArchive });

    return (
        <table className={classWrapperProductTable}>
            <tbody>
                {productList.map((product) => (
                    <tr key={product.id} className={styles.bodyRow}>
                        <td className={styles.productName}>{product.productName}</td>
                        <td className={styles.productComment}>{product.productComment}</td>
                        {!isView ? (
                            <td className={styles.iconActions}>
                                <ButtonImage
                                    onClick={() => handleDelete(product.id)}
                                    image={<Delete />}
                                    onlyImage={true}
                                    variant='delete'
                                />
                            </td>
                        ) : null}
                    </tr>
                ))}
            </tbody>
            <thead>
                <tr className={styles.headRow}>
                    <th className={styles.productName}>Наименование</th>
                    <th className={styles.productComment}>Комментарий к продукту</th>
                    {!isView ? <th className={styles.iconActions}>Действия</th> : null}
                </tr>
            </thead>
        </table>
    );
});
