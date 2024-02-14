const { badRequest } = require("../utils/response");
const { CollectionTypes } = require("../utils/types");
const { URLValidation } = require('../utils/helper');
module.exports = {
    collectionValidation : (req,res,next) => {
       const { 
        name,
        type,
        text,
        richText,
        discription,
        redirectURL
     } = req.body;
     
     if(!name ||!type ){
        return res.status(400).json({
            ...badRequest,
            message :' missing name/type'
        });
     }

     if(!CollectionTypes.includes(type)){
        return res.status(400).json({
            ...badRequest,
            message : 'invalid collection type'
        });
     }
     if (redirectURL && !URLValidation(redirectURL)){
        return res.status(400).json({
            ...badRequest,
            message : 'invalid redirection URL'
        });
     }
     if(text && ! typeof text === 'string') {
        return res.status(400).json({
            ...badRequest,
            message : 'text should be string'
        });
     }

     if(richText && ! typeof richText === 'string') {
        return res.status(400).json({
            ...badRequest,
            message : 'rich text should be string'
        });
     }

     if(discription && ! typeof discription === 'string') {
        return res.status(400).json({
            ...badRequest,
            message : 'discription should be string'
        });
     }

     next();
    }
}