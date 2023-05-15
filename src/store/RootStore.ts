import {CustomerStore} from "./CustomerStore";
import {AuthStore} from "./AuthStore";
import {ModalStore} from "./ModalStore";
import {ValidatorStore} from "./ValidatorStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    customerStore;
    authStore;
    modalStore;
    validateStore;

    constructor() {
        this.customerStore = new CustomerStore();
        this.authStore = new AuthStore();
        this.modalStore = new ModalStore();
        this.validateStore = new ValidatorStore();
    }
}