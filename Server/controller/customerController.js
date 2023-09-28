const Customer = require('../models/Customer');

module.exports = {
    addCustomer : async(req, res) => {
        const customer = new Customer({
            ...req.body
        });

        try {
            await customer.save();
            res.status(201).json(customer);
        }
        catch(err) {
            res.status(400).json({ message: err.message });
        }
    },
    viewCustomer : async(req, res) => {
        try {
            const customer = await Customer.find();

            customer.length === 0 ? res.status(404).json({ message: "Customer not found" }) : res.status(200).json(customer);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateCustomer : async(req, res) => {
        const updates = Object.keys(req.body);
        const allowUpdates = [ "firstName", "lastName", "email", "phoneNumber" ];
        const isValidOperation = updates.every((update) => allowUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(403).json({ message : "Invalid key parameter" })
        }

        try {
            const customer = await Customer.findById(req.params.id);

            if (!customer) {
                return res.status(404).json({ message : "Customer not found" })
            }
            updates.forEach((update) => {
                customer[update] = req.body[update];
            });

            await customer.save();
            res.status(200).json(customer);
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteCustomer : async(req, res) => {
        try {
            const customer = await Customer.findByIdAndDelete(req.params.id);

            customer ? res.status(200).json({ message: "Customer deleted" }) : res.status(404).json({ message: "Customer not found" });
        }
        catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
}