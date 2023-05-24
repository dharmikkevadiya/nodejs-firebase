const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const generateAuthToken = async (id) => {
  const token = jwt.sign({ _id: id }, JWT_SECRET);
  return token;
};

const Response = (message, data) => ({
  status: 200,
  message,
  result: data,
});

module.exports = {
  checkPassword,
  generateAuthToken,
  genPasswordHash,
  Response,
};
