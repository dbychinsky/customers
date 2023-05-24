import {CustomerStore} from "./CustomerStore";
import {AuthStore} from "./AuthStore";
import {ModalStore} from "./ModalStore";
import {SettingStore} from "./SettingStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    customerStore;
    authStore;
    modalStore;
    settingStore;

    constructor() {
        this.customerStore = new CustomerStore();
        this.authStore = new AuthStore();
        this.modalStore = new ModalStore();
        this.settingStore = new SettingStore();
    }
}