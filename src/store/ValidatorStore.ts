import {makeAutoObservable, runInAction} from "mobx";
import {Field} from "../component/form/Form";



export class ValidatorStore {
    // public errorList: FieldError[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Установка списка ошибок в состояние
     *
     * @param fieldList список полей
     * @param errorList список ошибок
     */
    // setErrorList = (fieldList: Field[], errorList: FieldError[]) => {
    //     runInAction(() => {
    //         this.errorList = errorList
    //     });
    // }

    /**
     * Установка ошибки в конкретное поле
     * @param field - поле
     * @param message - ошибка
     */
    // setError = (field: string, message: string) => {
    //     runInAction(() => {
    //         this.errorList.push({field: field, message: message});
    //     })
    // }

}