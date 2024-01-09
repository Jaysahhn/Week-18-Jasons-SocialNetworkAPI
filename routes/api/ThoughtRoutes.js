const router = require('express').Router();

const { createThought, getThought, getSingleThought, deleteThought, editThought, addReaction, deleteReaction } = require('../../controllers/thoughtController.js');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

router.route('/:thoughtId').delete(deleteThought);

router.route('/:thoughtId').put(editThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router; 