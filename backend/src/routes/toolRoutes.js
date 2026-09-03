const express = require('express');
const { getAllTools, getToolBySlug } = require('../controllers/toolController');

const router = express.Router();

// GET /api/tools          → list all tools (supports ?category=&featured=true)
router.get('/', getAllTools);

// GET /api/tools/:slug    → single tool by slug
router.get('/:slug', getToolBySlug);

module.exports = router;
