const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Estoy en GET /users',
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Estoy en GET /users/${id}`,
  });
});

router.post('/', (req, res) => {
  res.json('Estoy en POST /users');
});

router.put('/:id', (req, res) => {
  res.json('Estoy en PUT /users');
});

router.delete('/:id', (req, res) => {
  res.json('Estoy en DELETE /users');
});

module.exports = router;
