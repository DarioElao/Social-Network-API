const { Thought, User } = require('../models');

module.exports = {

    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.status(200).json(thought))
            .catch((err) => res.status(500).json(err))
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    :  res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thought: thought._id } },
                    { new: true }
                );
            })
            .then((user) => {
                if (!user) {
                  return res.status(404).json({ message: "No user with this id!" });
                }
                else 
                res.json({ message: "Thought created!" });
              })
            .catch((err) =>  res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    :  res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this ID" })
                    : res.status(200).json({ message: "Thought deleted" })
            )
            .catch((err) => res.status(500).json(err));
          
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought matches this ID" })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};

