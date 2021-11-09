const express = require("express");
const controller = require("../controller/estabelecimentoController");
const router = express.Router();

router.get("/todos", controller.getAll)
router.get("/:id", controller.getId)
router.post("/cadastro", controller.cadastrar)
router.post("/like/:id", controller.like)
router.post("/deslike/:id", controller.deslike)

module.exports = router