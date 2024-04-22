import { ContactListStore } from 'store/ContactListStore';
import { AuthStore } from 'store/AuthStore';
import { ContactEditStore } from 'store/contactEditStore/ContactEditStore';
import { ProductListStore } from 'store/ProductListStore';
import { CurrencyStore } from 'store/currencyStore/CurrencyStore';

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    authStore;
    contactListStore;
    contactEditStore;
    productListStore;
    currencyStore;

    constructor() {
        this.authStore = new AuthStore();
        this.contactListStore = new ContactListStore();
        this.contactEditStore = new ContactEditStore();
        this.productListStore = new ProductListStore();
        this.currencyStore = new CurrencyStore();
    }
}
