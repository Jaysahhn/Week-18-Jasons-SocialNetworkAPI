const Thought = require('../models/Thought');

module.exports = {
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbUserData = await Thought.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async editThought(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.deleteOne({ _id: req.params.userId });
            if (!deleteThought) {
                return res.status(404).json({ message: 'No existing user with that ID' });
            }
            res.json({ message: 'Thought deleted', deleteThought });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const reaction = req.body;

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $push: { reactions: reaction } },
                { new: true }
            );

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const reaction = req.body;

            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: reaction } },
                { new: true }
            );

            res.json("Deleted reaction");
        } catch (err) {
            res.status(500).json(err);
        }
    },
}; 