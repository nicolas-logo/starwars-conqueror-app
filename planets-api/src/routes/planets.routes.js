const { Router } = require('express');
const planetsCtrl = require('../controllers/planets.controller');

const router = Router();

router.get('/:name', planetsCtrl.GetPlanet);
router.post('/', planetsCtrl.UpdatePlanet);

module.exports = router;