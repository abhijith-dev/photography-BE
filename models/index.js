const { Schema,model } = require('mongoose');
const { CollectionTypes } = require('../utils/types');

const CollectionSchema = new Schema({
    name: String,
    image:String,
    headerTaglineOne:String,
    headerTaglineTwo: String,
    headerTaglineThree: String,
    headerTaglineFour:String,
    showCursor: Boolean,
    darkMode: Boolean,
    socials: [
      {
        id: String,
        title: String,
        link: String
      }
    ],
    projects: [
      {
        id: String,
        title: String,
        description:String,
        imageSrc: String,
        url: String
      }
    ],
    services: [
      {
        id: String,
        title: String,
        description: String
      }
    ],
    aboutpara: String,
    gallery: [
      {
        id: String,
        title: String,
        description: String,
        imageSrc:String,
        url: String
      }
    ],
    work:[
      {
        title:String,
        image:String,
        date:String,
        slug:String,
        preview:String,
        album:[
          {
            id:String,
            imageSrc:String
          }
        ]
      }
    ]
  });

module.exports = model('collection',CollectionSchema);