'use strict';
import axios from 'axios';

export class UnsplashAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '28720799-a754ce579910a3feda1cd147c';

    constructor() {
    this.page = 1;
    this.query = null;
    this.per_page = 40;
    }

    fetchPhotosByQuery() { //Заміняє закоментований код
        return axios.get(`${this.#BASE_URL}`, {
            params: {
                key: this.#API_KEY,
                image_type: this.photo,
                orientation: this.horizontal,
                safesearch: this.true,
                q: this.query,
                page: this.page,
                per_page: this.per_page,
            },
        });

    // const searchParams = new URLSearchParams({
    //     key: this.#API_KEY,
    //     image_type: this.photo,
    //     orientation: this.horizontal,
    //     safesearch: this.true,
    //     q: this.query,
    //     hits: this.page,
    //     // per_page: 10,
        
    // });

    // return fetch(`${this.#BASE_URL}?${searchParams}`).then(
    //     response => {
    //     if (!response.ok) {
    //         throw new Error(response.status);
    //     }

    //     return response.json();
    //     }
    // );
    }
}