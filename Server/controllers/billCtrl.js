require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const addCredit = async (req, res) => {
  const charge = await stripe.charges
    .create({
      amount: 500,
      currency: "usd",
      description: "5$ to push post to top",
      source: req.body.id
    })
    .then(
      req.app
        .get("db")
        .addCredit(req.user.id)
        .then(response => {
          console.log(response);
          req.session.passport.user = response[0];
          res.status(200).json(req.session.passport.user);
        })
        .catch(err => res.status(500).json(err))
    );

  console.log(req.user.id);
};

const reduceCredit = (req, res, next) => {
  req.app
    .get("db")
    .reduceCredit(req.user.id)
    .then(response => {
      console.log(response);
      req.session.passport.user = response[0];
      res.status(200).json(req.session.passport.user);
    })
    .catch(err => res.status(500).json(err));

  console.log(req.user.id);
};

module.exports = {
  addCredit,
  reduceCredit
};
