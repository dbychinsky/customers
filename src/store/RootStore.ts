import { ContactViewStore } from "store/ContactViewStore";
import { AuthStore } from "./AuthStore";
import { ContactEditStore } from "store/ContactEditStore";

/**
 * Объеденение всех Store в RootStore
 */
export class RootStore {
    authStore;
    contactViewStore;
    contactEditStore;

    constructor() {
        this.authStore = new AuthStore();
        this.contactViewStore = new ContactViewStore();
        this.contactEditStore = new ContactEditStore();
    }
}