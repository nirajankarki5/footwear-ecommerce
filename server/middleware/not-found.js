const notFound = (req, res) => {
  res.status(404).json({ msg: "Error, Not Found" });
};

module.exports = notFound;
