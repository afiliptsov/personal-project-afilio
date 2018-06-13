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

const getImageByPostId = (req, res, next) => {
  console.log(req.params);
  req.app
    .get("db")
    .getImageByPostId(req.params.id)
    .then(response => {
      console.log("Response From Params", response);
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  addImage,
  getImageByPostId
};
