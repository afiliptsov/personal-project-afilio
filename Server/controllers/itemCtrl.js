const getAllItems = (req, res) => {
  console.log(req.user);
  console.log("HIT");
  req.app
    .get("db")
    .getAllItems()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const createItem = (req, res, next) => {
  console.log(req.user);
  req.app
    .get("db")
    .addItem([
      req.body.user_id,
      req.body.item_category,
      req.body.item_title,
      req.body.item_price,
      req.body.item_description,
      req.body.item_location,
      req.body.item_zip,
      req.body.item_picture
    ])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

module.exports = {
  getAllItems,
  createItem
};
