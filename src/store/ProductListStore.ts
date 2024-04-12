import { makeAutoObservable, runInAction } from 'mobx';
import { server } from 'App';

/**
 * @description Store для отображения видов продукции.
 */
export class ProductListStore {
    /**
     * @description Список продукции.
     */
    productList: [] = [];

    /**
     * @description Флаг загрузки.
     */
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        this.getProductList = this.getProductList.bind(this);
    }

    /**
     * @description Получение спика продукции.
     */
    getProductList() {
        runInAction(() => {
            this.isLoading = true;
        });
        server
            .getProducts()
            .then((product) => {
                runInAction(() => {
                    this.productList = product.sort();
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('client received an error response (5xx, 4xx)');
                } else if (err.request) {
                    console.log('client never received a response, or request never left');
                }
            })
            .finally(() => {
                setTimeout(() => {
                    runInAction(() => {
                        this.isLoading = false;
                    });
                }, 500);
            });
    }
}
