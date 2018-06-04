const getAllItems = (req, res) => {
  console.log("HIT");
  req.app
    .get("db")
    .getAllItems()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  getAllItems
};
