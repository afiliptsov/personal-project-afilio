const addImage = (req, res, next) => {
  console.log(req.body);
  req.app
    .get("db")
    .addImage([req.body.post_id, req.body.image_url])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addImage
};
