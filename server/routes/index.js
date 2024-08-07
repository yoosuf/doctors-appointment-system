const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello');
  });

router.use("/admin", require("./admin/index"));
router.use("/client", require("./client/index"));

module.exports = router;
