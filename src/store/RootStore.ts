import {ContactStore} from "./ContactStore";
import {AuthStore} from "./AuthStore";
import {ModalStore} from "./ModalStore";
import {SettingStore} from "./SettingStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    contactStore;
    authStore;
    modalStore;
    settingStore;

    constructor() {
        this.contactStore = new ContactStore();
        this.authStore = new AuthStore();
        this.modalStore = new ModalStore();
        this.settingStore = new SettingStore();
    }
}