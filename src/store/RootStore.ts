import {ContactStore} from "./ContactStore";
import {AuthStore} from "./AuthStore";
import {ModalStore} from "./ModalStore";
import {CurrencyRateStore} from "./CurrencyRateStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    contactStore;
    authStore;
    modalStore;
    currencyRateStore;

    constructor() {
        this.contactStore = new ContactStore();
        this.authStore = new AuthStore();
        this.modalStore = new ModalStore();
        this.currencyRateStore = new CurrencyRateStore();
    }
}