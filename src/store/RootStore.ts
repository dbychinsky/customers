import {CustomerStore} from "./CustomerStore";
import {AuthStore} from "./AuthStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    customerStore;
    authStore;

    constructor() {
        this.customerStore = new CustomerStore();
        this.authStore = new AuthStore();
    }
}