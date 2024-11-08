function handleRouteErrors(error, req, res) {
    // for actual JS exceptions, log the exception stack
  
    res.status(error.statusCode || 500).json({
      status: error.status || 'Internal Server Error',
      message: error.message || 'Internal Server Error',
      errors: error.errors || 'Some Error occurred at our end',
    });
  }
  
  module.exports = {
    handleRouteErrors,
  };