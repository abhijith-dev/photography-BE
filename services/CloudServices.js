const Cloud = require("../config/cloud");

const UploadAssets = async (path) => {
   const result = await  Cloud.uploader.upload(path);
   return result;
};

module.exports = UploadAssets;
