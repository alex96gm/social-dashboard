const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: 'User'
    }
}, { discriminatorKey: 'kind', timestamps: true });

module.exports = mongoose.model('stats', statsSchema);