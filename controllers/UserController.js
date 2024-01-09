const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No existing user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deleteUser = await User.deleteOne({ _id: req.params.userId });
            if (!deleteUser) {
                return res.status(404).json({ message: 'No existing user with that ID' });
            }
            res.json({ message: 'User deleted', user: deleteUser });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async editUser(req, res) {
        try {
            const userId = req.params.userId;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.body.friendId;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { friends: friendId } },
                { new: true }
            );

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.body.friendId;

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
                { new: true }
            );

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};