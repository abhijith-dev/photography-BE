const envs = process.env;

module.exports = {
    port : envs.PORT,
    db_url : envs.DATABSE_URL,
    content_id : envs.CONTENT_ID
}