const Controller = require("../controllers/videoControllers");
const express = require("express");
const multer = require("multer");
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
// Se configura el destino de los archivos subidos a multer y el limite de peso que pueden tener estos
const PESO_MAXIMO = 1024 * 1024 * 50;

/* 
  La primera no tiene el peso del archivo especificado pero se maneja el error en la funcion subir video
  y en la segunda si se especifica el peso pero cuando manda error la aplicacion no dice el error del peso,
  para que entiendas deja una de las dos siguientes lineas y prueba, asi como estan 
*/
// const upload = multer({ dest: "uploads/"});
const upload = multer({ dest: "uploads/" , limits: { fileSize: PESO_MAXIMO} });

const router = express.Router();

async function obtenerVideos(request, response) {
  const result = await Controller.obtenerVideos();
  response.send(result.data);
}

async function subirVideo(request, response) {
    const file = request.file;
  // console.log(file.path)
  // console.log(file.originalname) 
  // console.log(file.size)

  if (file.size > PESO_MAXIMO) {
    return response.status(400).json({
      success: false,
      error: 'El video excede el peso permitido',
    });
  }

  // ffmpeg permite obtener los metadatos del video y de ahi sacar la duracion de este
  /*ffmpeg.ffprobe(file.path, (err, metadata) => {
    
    // console.log(metadata)
    // console.log(metadata.format)
    const duracionVideo = metadata.format.duration;
    console.log(duracionVideo)

    if (duracionVideo > 60) {
        // Se elimina el archivo temporal generado
        fs.unlinkSync(file.path)
        return response.status(400).json({
          success: false,
          error: 'El video excede la duración permitida',
        });
    }

  });
  */
  const result = await Controller.subirVideo(file.path, file.originalname, file.size);

  // Una vez realizada correctamente la peticion anterior se elimina el archivo temporal generado
  if (result.status === 200) {
    fs.unlinkSync(file.path)
  }

  response.send(result.data);
}

function darLike(request, response) {
  try {
    const { videoId } = request.params;
    const deviceId = request.headers['device-id'];
    // console.log(videoId)
    // console.log(deviceId)
    
    const liked = Controller.likeVideo(videoId, deviceId);
    response.json({ liked });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
}


router.get("/", obtenerVideos);
router.post("/", upload.single("file"), subirVideo);
router.post("/:videoId/likes", darLike)

module.exports = router;
