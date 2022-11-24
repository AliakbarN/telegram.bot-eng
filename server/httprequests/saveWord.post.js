const axios = require('axios').default

class HttpRequestSaveWord {
    #url;

    constructor(url) {
        this.#url = url;
    };

    async post (word) {
        const response = await axios.post(this.#url, { text: word });
        return { data: response.data, status: response.status };
    };
}

module.exports = new HttpRequestSaveWord(process.env.WORD_API_URL)