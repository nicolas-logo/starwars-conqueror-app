const _ = require('lodash');

const planetsCtrl = {};

const Planet = require("../models/Planet");

planetsCtrl.GetPlanet = async (req, res) => {
  let { name } = req.params;
  name = name.toUpperCase();

  try {
    const planet = await Planet.findOne({ name });

    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    return res.json(planet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

planetsCtrl.UpdatePlanet = async (req, res) => {
  let { name, last_modified_by } = req.body;
  name = name.toUpperCase();
  last_modified_by = last_modified_by.toUpperCase();

  try {
    // Find the planet by name
    let planet = await Planet.findOne({ name });

    // If the planet doesn't exist, create a new one
    if (!planet) {
      planet = new Planet({
        name,
        last_modified_by
      });
    } else {
      // If the planet exists, update the last_modified_by field
      planet.last_modified_by = last_modified_by;
    }

    // Save the planet (either newly created or updated)
    await planet.save();

    return res.json(planet);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = planetsCtrl;
