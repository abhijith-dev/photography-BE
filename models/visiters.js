const { Schema,model } = require('mongoose');

const StatisticSchema = new Schema({
    visitor_count : Number,
    avg_time : String,
    month : String,
    year: String,
});

module.exports = model('visiter',StatisticSchema);