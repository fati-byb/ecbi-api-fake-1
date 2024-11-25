// upload.js (Multer configuration)
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const FileUpload = require('../models/media.model'); // Import your mongoose model

const imageFolderPath = path.resolve('./media/images');

// Ensure directory exists
if (!fs.existsSync(imageFolderPath)) {
    fs.mkdirSync(imageFolderPath, { recursive: true });
    console.log('Media folder created successfully');
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, imageFolderPath);
    },
    filename: function (req, file, callback) {
        const originalnameSplit = file.originalname.split('.');
        const fileExtension = originalnameSplit[originalnameSplit.length - 1];
        const productName = req.body.libele ? req.body.libele.replace(/[^a-zA-Z0-9]/g, '_') : 'unknown_product';
        const newFileName = `${productName}.${fileExtension}`;
        const filePath = path.join(imageFolderPath, newFileName);

        if (fs.existsSync(filePath)) {
            const err = new Error('File already exists. Please choose a different file name.');
            err.status = 400; // Bad request
            return callback(err, false);
        }

        callback(null, newFileName);
    }
});

const fileFilter = (req, file, callback) => {
    const typeFile = file.mimetype.split('/')[0];
    if (typeFile === 'image') {
        callback(null, true);
    } else {
        const err = new Error('Invalid image type');
        err.status = 401; // Unauthorized
        callback(err, false);
    }
};

const uploadImage = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 20 // Limit image size to 20MB
    },
    fileFilter
});

// Export the upload middleware
module.exports = uploadImage;
