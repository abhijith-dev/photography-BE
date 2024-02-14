const { internalServerError, saveResponse } = require("../utils/response");
const Collection = require("../models/index");
const multer = require("multer");
const upload = require("../middlewares/mediaManger");
const {
  uploadAndSaveDetailsGallery,
  uploadAndSaveDetailsServices,
  uploadAndSaveDetailsProjects,
  uploadAndSaveDetailsSocials,
  uploadAndSaveDetailsAboutUs,
  uploadAndSaveDetailsAblum,
  uploadAndSaveDetailsWork,
  removeFromCollection
} = require("../utils/uploader");
const visiterCollection = require("../models/visiters");
const messagesCollection = require("../models/messages");

module.exports = {
  post: async (req, res) => {
    try {
      let response = new Collection(req.body);
      await response.save();
      res.status(200).json({
        message: "data saved",
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },
  content: async (req, res) => {
    try {
      const data = await Collection.find({});
      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  gallery: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");

      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ ...internalServerError });
        } else if (err) return res.status(500).json({ ...internalServerError });
        else {
          await uploadAndSaveDetailsGallery(information, req.file.filename);
          res.status(200).json({ ...saveResponse });
        }
      });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  services: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");
      await uploadAndSaveDetailsServices(information);
      res.status(200).json({ ...saveResponse });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  projects: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");

      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ ...internalServerError });
        } else if (err) return res.status(500).json({ ...internalServerError });
        else {
          await uploadAndSaveDetailsProjects(information, req.file.filename);
          res.status(200).json({ ...saveResponse });
        }
      });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  socials: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");
      await uploadAndSaveDetailsSocials(information);
      res.status(200).json({ ...saveResponse });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  aboutUs: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");
      await uploadAndSaveDetailsAboutUs(information);
      res.status(200).json({ ...saveResponse });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  work: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          throw Error();
        } else if (err) throw Error();
        else {
          await uploadAndSaveDetailsWork(information,req.file.filename);
          res.status(200).json({ ...saveResponse });
        }
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ ...internalServerError });
    }
  },

  albums: async (req, res) => {
    try {
      const information = JSON.parse(req.headers.information || "{}");
      await uploadAndSaveDetailsAblum(information);
      res.status(200).json({ ...saveResponse });
    } catch (error) {
      res.status(500).json({ ...internalServerError });
    }
  },

  visiters : async (req, res) => {
    try {
      const date = new Date();
      let m = date.toDateString().split(" ")[1];
      let y = date.getFullYear().toString();
      const currentCountList = await visiterCollection.find({ month : m, year :y});
      if(currentCountList.length === 0) {
        let vister = new visiterCollection({
          visitor_count : 1,
          month:m,
          year:y
        });
        await vister.save();
      }
      else{ 
        await visiterCollection.updateOne({_id:currentCountList[0]._id,month:m,year:y},{
          visitor_count : ( currentCountList[0]?.visitor_count || 1 ) + 1
        });
      }
      res.status(200).json({...saveResponse });
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  messages: async (req, res) => {
    try {
      const body = req.body;
      const message = new messagesCollection(body);
      message.save();
      res.status(200).json(message);

    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  avarageTime : async(req, res) => {
    try {

      const date = new Date();
      let m = date.toDateString().split(" ")[1];
      let y = date.getFullYear().toString();
      const time = req.body.time;
      const currentCountList = await visiterCollection.find({ month : m, year :y});
      if(currentCountList.length === 0) {
        let vister = new visiterCollection({
          avg_time : `${time}`,
          month:m,
          year:y
        });
        await vister.save();
      }
      else{
        let avg = (parseInt(currentCountList[0].avg_time) + parseInt(time)) / (currentCountList[0]?.visitor_count ? 2 : parseInt(currentCountList[0]?.visitor_count)) ;  
        await visiterCollection.updateOne({_id:currentCountList[0]._id,month:m,year:y},{
          avg_time :`${avg}`
        });
      }
      res.status(200).json({...saveResponse });
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  getAvgTime: async (req, res) => {
    try {
      const date = new Date();
      let m = date.toDateString().split(" ")[1]
      let y = date.getFullYear().toString();
      const data = await visiterCollection.find({ month : m, year :y});
      let min = Math.floor((parseInt(data[0].avg_time)/1000/60) << 0);
      let sec = Math.floor((parseInt(data[0].avg_time)/1000) % 60);
      res.status(200).json({
         time : `${min} min ${sec} sec`
      });
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  getAllStats : async (req, res) => {
    try {
      const data = await visiterCollection.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  galleryPop : async (req,res) =>{
    try {
      await removeFromCollection('gallery',req.body.id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  servicesPop : async (req,res) =>{
    try {
      await removeFromCollection('services',req.body.id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({...internalServerError });
    }
  },

  projectsPop : async (req,res) =>{
    try {
      await removeFromCollection('projects',req.body.id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },

  socialsPopPop : async (req,res) =>{
    try {
      await removeFromCollection('socials',req.body.id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({...internalServerError });
    }
  },

  workPop : async (req,res) =>{
    try {
      await removeFromCollection('work',req.body.id);
      res.status(200).json({
        message: 'Successfully deleted'
      });
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  },


  getMessages : async (req,res) =>{
    try {
      const data = await messagesCollection.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({...internalServerError });
    }
  }

};
