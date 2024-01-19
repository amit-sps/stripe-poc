exports.sendResponse = (res, status, statusCode, message, data = null) => {
  return res.status(statusCode).json({ status, statusCode, message, data });
};
