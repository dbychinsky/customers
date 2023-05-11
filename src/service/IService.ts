import {Posts} from "../model/Posts";

export interface IService {

    /**
     * Получение списка заказчиков
     */
    getCustomerList(): Promise<[]>;

    pushCustomerList(posts: Posts): Promise<void>;
}