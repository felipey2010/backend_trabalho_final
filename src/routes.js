const express = require("express");
const routes = express.Router();
// const verify = require("./verifyToken");

routes.get("/", (req, res) => {
  res.send("URL Base da API");
});

const CategoryController = require("./controllers/CategoryController");

//Categories Routes
routes.get("/categories", CategoryController.index);
routes.get("/category/:id", CategoryController.show);
routes.post("/category", CategoryController.store);
routes.put("/category/:id", CategoryController.update);
routes.delete("/category/:id", CategoryController.destroy);

const BlogController = require("./controllers/BlogController");

//Blog Routes
routes.get("/articles", BlogController.index);
routes.get("/article/:id", BlogController.show);
routes.post("/article", BlogController.store);
routes.put("/article/:id", BlogController.update);
routes.delete("/article/:id", BlogController.destroy);

// const MembroController = require("./controllers/MembersControllers");

// //Members Routes
// routes.get("/member", MembroController.index);
// routes.get("/member/:id", MembroController.show);
// routes.post("/member", MembroController.store);
// routes.put("/member/:id", MembroController.update);
// routes.delete("/member/:id", MembroController.destroy);

// const UserController = require("./controllers/UsersController");
// //User Routes
// routes.get("/user", UserController.index);
// routes.get("/user/:id", UserController.show);
// routes.post("/user", UserController.store);
// routes.put("/user/:id", UserController.update);
// routes.delete("/user/:id", UserController.destroy);
// routes.put("/user/change_password/:email", UserController.changePassword);
// routes.get("/user/verify_email/:email", UserController.verifyEmail);

// const AuthController = require("./controllers/AuthController");
// routes.post("/user/login", AuthController.authenticate);
// routes.post("/user/logout/:id", AuthController.logout);
// routes.post("/user/verify_token/:token", AuthController.checkToken);

module.exports = routes;
