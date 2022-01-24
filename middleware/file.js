const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb){
cb(null, "images")
    },
    filename(req, file , cb){
cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname)
    }
})

const filterFile = (req, file, cb)=> {
if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
cb(null, true)
}else{
   cb(null, false) 
}
}

module.exports= multer({
storage,
filterFile,
})