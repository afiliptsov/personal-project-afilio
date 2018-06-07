// const addProfileInfo = (req, res) => {
//   const db = req.app.get("db");
//   const { id } = req.params;
//   const { user_phone, user_avatar, user_address } = req.body;
//   db.addProfileInfo([user_phone, user_avatar, user_address, id])
//     .then(users => {
//       console.log(users);
//       res.status(200).json(users);
//     })
//     .catch(err => res.status(500).json(err));
// };

const addProfileInfo = (req, res) => {
  req.app
    .get("db")
    .addProfileInfo([
      req.body.user_phone,
      req.body.user_avatar,
      req.body.user_address,
      req.params.id
    ])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addProfileInfo
};
