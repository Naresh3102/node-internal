exports.errorResponse = (req, res) => {
  console.log(req.baseUrl);
  res.status(404).json({
    message: `${req.baseUrl} does not exist`,
  });
};
