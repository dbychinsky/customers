import {makeAutoObservable, runInAction} from 'mobx';

export class ModalStore {
    public modalDeleteActive: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.setModalDeleteActive = this.setModalDeleteActive.bind(this);
    }

    setModalDeleteActive(state: boolean) {
        runInAction(() => {
            this.modalDeleteActive = state;
        })
    }

}