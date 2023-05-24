const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/demo1";
const APP_URL = process.env.APP_URL || "http://localhost:5000";
const JWT_SECRET = process.env.JWT_SECRET || "hellojwt123";
const BUCKET_URL = process.env.BUCKET_URL;
const PORT = process.env.PORT || 5000;

module.exports = {
  MONGODB_URL,
  APP_URL,
  PORT,
  JWT_SECRET,
  BUCKET_URL,
};
