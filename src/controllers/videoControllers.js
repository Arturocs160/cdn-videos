const CloudFlare = require("../services/cloudflare");

const likes = {};


function subirVideo(path, name, size) {
  const cloudFlare = CloudFlare.getInstance();
  return cloudFlare.subirVideo(path, name, size);
}

function obtenerVideos() {
  const cloudFlare = CloudFlare.getInstance();
  return cloudFlare.obtenerVideos();
}

function likeVideo(videoId, deviceId) {
  if (!likes[videoId]) {
    likes[videoId] = new Set();
  }

  // Si ya existe el deviceId, lo removemos (dislike)
  if (likes[videoId].has(deviceId)) {
    likes[videoId].delete(deviceId);
    return false;
  } 
  // Si no existe, lo agregamos (like)
  else {
    likes[videoId].add(deviceId);
    return true;
  }
}

module.exports = {
  obtenerVideos,
  subirVideo,
  likeVideo
};
