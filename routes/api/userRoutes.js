const router = require('express').Router();

const { createUser, getUsers, getSingleUser, deleteUser, editUser, addFriend, deleteFriend } = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId').delete(deleteUser);

router.route('/:userId').put(editUser);

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends').delete(deleteFriend);

module.exports = router; 