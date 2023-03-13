const error = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const message = err.message? err.message : "Something went wrong"
    res.status(statusCode);
  
    res.json({
      message: message
    });
  };
  
export default error;