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
      req.body.user_name,
      req.body.user_email,
      req.params.id
    ])
    .then(response => {
      req.session.passport.user = response[0];
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addProfileInfo
};
