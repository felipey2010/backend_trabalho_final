const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");

const secret = "XXX";

module.exports = {
  async authenticate(req, res) {
    const { email, senha } = req.body;
    await User.findOne({ email: email }, function (err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          success: false,
          error: "E-mail Error",
        });
      } else {
        user.isCorrectPassword(senha, async function (err, same) {
          if (err) {
            res.status(500).json({
              success: false,
              error: "Internal Error",
            });
          } else if (!same) {
            res.status(401).json({
              success: false,
              error: "Password Error",
            });
          } else {
            user.isLoggedIn = true;
            user.lastLoggedIn = Date.now();

            await User.findByIdAndUpdate(user._id, user, {
              new: true,
            })
              .then(result => {
                const userDetails = {
                  isAdmin: user.isAdmin,
                  isLoggedIn: user.isLoggedIn,
                  dateCreated: user.dateCreated,
                  id: user._id,
                  nome: user.nome,
                  email: user.email,
                  lastLoggedIn: user.lastLoggedIn,
                  lastLoggedOut: user.lastLoggedOut,
                };

                // Issue token
                const payload = { email };
                const token = jwt.sign(payload, secret);

                return res
                  .cookie("token", token, { httpOnly: true })
                  .status(200)
                  .json({
                    success: true,
                    message: "Valid login",
                    token: token,
                    user: userDetails,
                  });
              })
              .catch(err => ({
                success: false,
                message: err,
              }));
          }
        });
      }
    });
  },
  async checkToken(req, res) {
    jwt.verify(req.params.token, secret, function (err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: "invalid",
        });
      } else {
        //console.log(decoded);
        User.findOne({ email: decoded.email }, function (err, user) {
          if (err) {
            console.error(err);
            res.json({
              success: false,
              message: "internal",
            });
          } else if (!user) {
            res.json({
              success: false,
              message: "incorrect",
            });
          } else {
            const userDetails = {
              isAdmin: user.isAdmin,
              isLoggedIn: user.isLoggedIn,
              dateCreated: user.dateCreated,
              id: user._id,
              nome: user.nome,
              email: user.email,
            };
            return res.status(200).json({
              success: true,
              message: "valid",
              user: userDetails,
            });
          }
        });
      }
    });

    //res.sendStatus(200);
  },
  async logout(req, res) {
    await User.findById(req.params.id, async function (err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          erro: "Erro: interno",
        });
      } else if (!user) {
        res.status(401).json({
          success: false,
          error: "User not found",
        });
      } else {
        user.isLoggedIn = false;
        user.lastLoggedOut = Date.now();

        await User.findByIdAndUpdate(user._id, user, {
          new: true,
        })
          .then(result => {
            return res.status(200).json({
              success: true,
              message: "Logged out",
            });
          })
          .catch(err => ({
            success: false,
            message: err,
          }));
      }
    });
  },
};
