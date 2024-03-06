const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Estoy en GET /categories',
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Estoy en GET /categories/${id}`,
  });
});

router.post('/', (req, res) => {
  res.json('Estoy en POST /categories');
});

router.put('/:id', (req, res) => {
  res.json('Estoy en PUT /categories');
});

router.delete('/:id', (req, res) => {
  res.json('Estoy en DELETE /categories');
});

module.exports = router;
