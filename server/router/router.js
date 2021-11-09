const {Router} = require('express');
const router = Router();

// Controllers
const statController = require('../controllers/count-controller');

// Route for add statistic
router.post('/add', statController.increment);

// Route for get statistic
router.get('/statistic', statController.statistic);

module.exports = router;