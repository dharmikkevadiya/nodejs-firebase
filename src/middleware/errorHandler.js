const { ValidationError } = require("joi");
const { JsonWebTokenError } = require("jsonwebtoken");

const CustomErrorHandler = require("../helper/CustomErrorHandler");

const errorHandler = async (err, req, res, next) => {
  let status = 500;
  let message = err.message;

  if (err instanceof CustomErrorHandler) {
    status = err.status;
  } else if (err instanceof ValidationError) {
    status = 422;
  } else if (err instanceof JsonWebTokenError) {
    status = 401;
    message = "Please Login first to continue";
  } else {
    console.log("req.user", req.user?._id);
    console.log("body::", req.body);
    console.log("params::", req.params);
    console.log("query::", req.query);
    console.log("Error part::", err);
  }

  return res.json({ status, message });
};

module.exports = errorHandler;
