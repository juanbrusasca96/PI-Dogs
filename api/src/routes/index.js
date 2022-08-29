const { Router } = require('express');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const Breed = require('../models/Breed.js');
// const { Temperament } = require('../models/Temperament.js');
const { Breed, Temperament } = require('../db.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    try {
        const dogs = await Breed.findAll({
            attributes: ['id', 'name', 'minHeight', 'maxHeight','minWeight', 'maxWeight', 'image'],
            include: Temperament
        })
        return res.json(dogs)
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

router.get('/dogs/name', async (req, res) => {
    const { name } = req.query;
    try {
        const dogs = await Breed.findAll({
            where: {
                name: { [Op.substring]: name }
            },
            include: Temperament
        })
        // return dogs.length === 0 ? res.status(404).send('No se encontro ninguna raza') : 
        return res.json(dogs)
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params;
    try {
        const dog = await Breed.findByPk(idRaza, {
            include: Temperament
        })
        return res.json(dog)
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

router.post('/dogs', async (req, res) => {
    const { name, minHeight, minWeight, startLifeSpan, maxHeight, maxWeight, endLifeSpan, image } = req.body;
    if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !image) {
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        const breed = await Breed.create({
            name, minHeight, minWeight, startLifeSpan, maxHeight, maxWeight, endLifeSpan, image
        })
        return res.json(breed)
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

router.put('/dogs', async (req, res) => {
    const { codeBreed, codeTemperaments } = req.body;
    try {
        const breed = await Breed.findByPk(codeBreed)
        return res.json(await breed.addTemperaments(codeTemperaments))
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

router.get('/temperaments', async (req, res) => {
    try {
        const temperaments = await Temperament.findAll()
        return res.json(temperaments)
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

router.post('/temperaments', async (req, res) => {
    const { names } = req.body
    try {
        const temperaments = await Temperament.bulkCreate(names)
        return res.json(temperaments)
    } catch (error) {
        return res.status(404).send(`Hubo un error, ${error}`)
    }
})

module.exports = router;
