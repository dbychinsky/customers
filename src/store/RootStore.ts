import { ContactListStore } from "store/ContactListStore";
import { AuthStore } from "./AuthStore";
import { ContactEditStore } from "store/ContactEditStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    authStore;
    contactListStore;
    contactEditStore;

    constructor() {
        this.authStore = new AuthStore();
        this.contactListStore = new ContactListStore();
        this.contactEditStore = new ContactEditStore();
    }
}