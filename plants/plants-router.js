const express = require('express');
const Plants = require('./plants-model');
const restricted = require('../auth/auth-router');

const router = express.Router();

router.get('/', restricted, (req, res) => {
    Plants.findPlants()
        .then((plants) => {
            res.json(plants);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get plants' });
        });
});

router.get('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Plants.findPlantById(id)
        .then((plant) => {
            if (plant) {
                res.json(plant);
            } else {
                res.status(404).json({
                    message: 'Could not find plant with given id',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to get plant' });
        });
});

router.post('/', restricted, (req, res) => {
    const plantData = req.body;

    Plants.addPlant(plantData)
        .then((plant) => {
            res.status(201).json(plant);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to add plant' });
        });
});

router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Plants.findPlantById(id)
        .then((plant) => {
            if (plant) {
                Plants.updatePlant(changes, id).then((updatedPlant) => {
                    res.json(updatedPlant);
                });
            } else {
                res.status(404).json({
                    message: 'Could not find plant with given id',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to update plant' });
        });
});

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Plants.removePlant(id)
        .then((deleted) => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({
                    message: 'Could not find plant with given id',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to delete plant' });
        });
});

module.exports = router;
