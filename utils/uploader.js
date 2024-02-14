const Collection = require("../models/index");
const CloudUploader = require("../services/CloudServices");
const fs = require("fs");
const {content_id} = require("../config/variables");

const uploadAndSaveDetailsGallery = async (information, fileName) => {
  const meta = await CloudUploader(`./uploads/${fileName}`);
  const url = meta.secure_url || "";
  const obj = {
    title: information.title,
    description: information.description,
    url: information.url,
    imageSrc: url,
  };
  await Collection.findOneAndUpdate(
    { _id: content_id },
    { $push: { gallery: obj } }
  );
  fs.unlinkSync(`./uploads/${fileName}`);
};

const uploadAndSaveDetailsServices = async (information) => {
  const obj = {
    title: information.title,
    description: information.description,
    url: information.url,
  };
  await Collection.findOneAndUpdate(
    { _id: content_id },
    { $push: { services: obj } }
  );
};

const uploadAndSaveDetailsProjects = async (information, fileName) => {
  const meta = await CloudUploader(`./uploads/${fileName}`);
  const url = meta.secure_url || "";
  const obj = {
    title: information.title,
    description: information.description,
    url: information.url,
    imageSrc: url,
  };
  await Collection.findOneAndUpdate(
    { _id: content_id },
    { $push: { projects: obj } }
  );
  fs.unlinkSync(`./uploads/${fileName}`);
};

const uploadAndSaveDetailsSocials = async (information) => {
  const obj = {
    title: information.title,
    url: information.url,
  };
  await Collection.findOneAndUpdate(
    { _id: content_id },
    { $push: { socials: obj } }
  );
};

const uploadAndSaveDetailsAboutUs = async (information) => {
  const aboutUsPara = information.about;
  await Collection.findOneAndUpdate(
    { _id: content_id },
    { aboutpara: aboutUsPara }
  );
};

const uploadAndSaveDetailsWork = async (information,fileName) => {
  const meta = await CloudUploader(`./uploads/${fileName}`);
  const url = meta.secure_url || "";
   const obj = {
    title: information.title,
    preview: information.preview,
    slug : (Math.floor(Math.random()*100000)).toString(),
    date : information.date,
    image: url,
    album : []
  };
  await Collection.findOneAndUpdate(
    { _id: content_id },
    { $push: { work: obj } }
  );
};

const uploadAndSaveDetailsAblum = async (information) => {
  const work_id = information.work_id;

  await Collection.updateOne(
    { _id : content_id },
    { $push: { [`work.${work_id}.album`]: newElement } })
};


const removeFromCollection = async (collection,id) => {
    await Collection.findOneAndUpdate(
      { _id: content_id },
      { $pull: { [collection]: { _id: id } } }
    );
};

module.exports = {
  uploadAndSaveDetailsGallery,
  uploadAndSaveDetailsServices,
  uploadAndSaveDetailsProjects,
  uploadAndSaveDetailsSocials,
  uploadAndSaveDetailsAboutUs,
  uploadAndSaveDetailsWork,
  uploadAndSaveDetailsAblum,
  removeFromCollection
};
