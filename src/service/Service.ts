import {IService} from "./IService";
import axios from "axios";
import {Posts} from "../model/Posts";

/**
 * Список URL валют
 */
const enum backendServerUrl {
    MAIN_URL = `https://dynamic-canyon-fear.glitch.me/`,
    POSTS = `posts`
}

export class Server implements IService {

    /**
     * Работа с локальным сервером
     */
    getCustomerList(): Promise<[]> {
        return axios.get(`${backendServerUrl.MAIN_URL}/${backendServerUrl.POSTS}`)
            .then(response => response.data)
    }

    async pushCustomerList(posts: Posts): Promise<void> {
        axios.post(`${backendServerUrl.MAIN_URL}/${backendServerUrl.POSTS}`, posts)
            .then((response) => response.data.id)
    }

}

