const db = require('../data/dbConfig');

const findPlants = () => {
    return db('plants');
};

const findPlantById = (id) => {
    return db('plants').where({ id }).first();
};

const addPlant = (plant) => {
    return db('plants').insert(plant).where();
};

const updatePlant = (changes, id) => {
    return db('plants')
        .where({ id })
        .update(changes)
        .then(() => {
            return findPlantById(id);
        });
};

const removePlant = (id) => {
    return db('plants').where({ id }).delete();
};

module.exports = {
    findPlants,
    findPlantById,
    addPlant,
    updatePlant,
    removePlant,
};
