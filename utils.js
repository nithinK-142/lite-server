// error handler
export const errorHandler = (res, error, operation) => {
  console.error(`Error ${operation}:`, error.message);
  return res.status(500).json({ error: "Internal server error" });
};

// response handler
export const sendResponse = (res, status, data) => {
  return res.status(status).json(data);
};
