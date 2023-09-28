const Category = require('../models/Category');

module.exports = {
    addCategory : async (req, res) => {
        console.log(req.body);
        const category = new Category({
            ...req.body
        });

        try {
            await category.save();
            res.status(201).json(category);
        }
        catch(err) {
            res.status(400).json({ message: err.message });
        }
    },
    viewCategory : async (req, res) => {
        try {
            const category = await Category.find();
            category.length === 0 ? res.status(404).json({message : "No data category found"}) : res.status(200).json(category);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateCategory : async (req, res) => {
        const updates = Object.keys(req.body);
        const allowUpdates = ["categoryName"];
        const isValidOperation = updates.every((update) => allowUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(403).json({ message : "Invalid key parameter" })
        }

        try {
            const category = await Category.findById(req.params.id);
            updates.forEach((update) => {
                category[update] = req.body[update];
            });

            await category.save();
            res.status(200).json(category);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteCategory : async (req, res) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            category === 0 ? res.status(200).json({message : "Category deleted"}) : res.status(404).json({message : "Category not found"});
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    }    
}