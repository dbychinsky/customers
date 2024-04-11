import { ContactListStore } from "store/ContactListStore";
import { AuthStore } from "./AuthStore";
import { ContactEditStore } from "store/ContactEditStore";
import { ProductListStore } from "store/ProductListStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    authStore;
    contactListStore;
    contactEditStore;
    productListStore;

    constructor() {
        this.authStore = new AuthStore();
        this.contactListStore = new ContactListStore();
        this.contactEditStore = new ContactEditStore();
        this.productListStore = new ProductListStore();
    }
}