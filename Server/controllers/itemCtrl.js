const getAllItems = (req, res) => {
  console.log(req.user);
  console.log("HIT");
  req.app
    .get("db")
    .getAllItems()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const getItem = (req, res) => {
  req.app
    .get("db")
    .getItem([req.params.id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
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
      req.body.item_lat,
      req.body.item_lng
    ])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

const changeItemPriority = (req, res, next) => {
  const id = [...req.body];
  req.app
    .get("db")
    .changeItemPriority(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  getAllItems,
  createItem,
  getItem,
  changeItemPriority
};
