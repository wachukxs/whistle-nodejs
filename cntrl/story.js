const express = require('express');
let router = express.Router();

const storyService = require('../srvc/story')

router.post(`/story`, express.json(), storyService.newStory)
router.get(`/story`, express.json(), storyService.getStories)

module.exports = router;