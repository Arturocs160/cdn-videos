// Singleton

const FormData = require('form-data')
const fs = require('fs')
const Client = require("./axios");

class CloudFlare extends Client {

    static instance;

    constructor() {
        super();
    }

    static getInstance() {
        if (!CloudFlare.instance) {
            CloudFlare.instance = new CloudFlare()
        }
        return CloudFlare.instance
    }

    obtenerVideos() {
        return this.client.get(`/accounts/c824bdac02e96d13150a861ce474cf2b/stream`);
    }

    subirVideo(path, name, size) {
        const formData = new FormData();
        formData.append('file', fs.readFileSync(path), {
            filename: name,
            knownLength: size
        })
        // console.log(formData)
        return this.client.post(`/accounts/c824bdac02e96d13150a861ce474cf2b/stream`, formData)
    }
}


module.exports = CloudFlare
