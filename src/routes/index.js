const videoNetwork = require('../network/videoNetwork')

function routes (app) {
    app.use("/videos", videoNetwork)
}

module.exports = routes;
