const { connect } = require('mongoose');
const { db_url } = require('./variables');

module.exports = async () => {
    try {
      await connect(db_url)
      .then(r => {
        console.log('connected to database..')
      })
      .catch(e => {throw Error(e)});
    }catch(error){
       return error
    }
}