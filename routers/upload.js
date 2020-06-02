//router.js
const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middleware/uploadMiddleware');
const Resize = require('../config/resizeImg');
const url=require('../config/url');
const checkUsers =require('../middleware/checkUsers');
router.post('/',checkUsers, upload.single('image'), async function (req, res) {
    // folder upload
    const imagePath = path.join(__dirname, '../public/images/avatar');
    // call class Resize
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    console.log('filename ',filename)

    return res.status(200).json({ data:{link:url.url+'public/images/avatar/'+filename} });
});

module.exports = router;