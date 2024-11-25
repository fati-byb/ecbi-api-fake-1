const mongoose = require("mongoose");
const moment = require("moment");

const FileUploadSchema = mongoose.Schema({
   fieldName: {
     type: String,
     required: true
   },

   originalName: {
     type: String,
     required: true
   },

   encoding: {
     type: String,
     required: true
   },

   mimeType: {
     type: String,
     required: true
   },

   destination: {
     type: String,
     required: true
   },

   fileName: {
     type: String,
     required: true
   },

   path: {
     type: String,
     required: true
   },

   size: {
     type: Number,
     required: true
   },

   createdAt: {
     type: Date,
     default: new Date()
   },

   deletedAt: {
     type: Date,
     default: null
   },

   updatedAt: {
     type: Date,
     default: null
   },
   createAt: {
     type: Date
   }
   // updateAt: [
   //   {
   //     type: Date,
   //   },
   // ],
});
FileUploadSchema.pre("save", async function(next) {
   try {
     if (this.isNew) {
       this.createAt = moment();
     }
     // this.updateAt.push(moment());

     next();
   } catch (e) {
     return next(e);
   }
});

const FileUpload = mongoose.model("FileUpload", FileUploadSchema);

module.exports = FileUpload;