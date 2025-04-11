const axios = require('axios')

class Client {
    client;

    constructor () {
        this.client = axios.create({
            baseURL: 'https://api.cloudflare.com/client/v4',
            headers: {
                'Authorization': `Bearer oPr1U0fjwxkAmAWkZGHJgeD2IoQBOKeHg20bNbbU`,
            }
        });
    }
}

module.exports = Client