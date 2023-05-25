import {ContactStore} from "./ContactStore";
import {AuthStore} from "./AuthStore";
import {ModalStore} from "./ModalStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    contactStore;
    authStore;
    modalStore;

    constructor() {
        this.contactStore = new ContactStore();
        this.authStore = new AuthStore();
        this.modalStore = new ModalStore();
    }
}