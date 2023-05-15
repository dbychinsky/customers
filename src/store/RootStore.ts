import {CustomerStore} from "./CustomerStore";
import {AuthStore} from "./AuthStore";
import {ModalStore} from "./ModalStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    customerStore;
    authStore;
    modalStore;

    constructor() {
        this.customerStore = new CustomerStore();
        this.authStore = new AuthStore();
        this.modalStore = new ModalStore();
    }
}