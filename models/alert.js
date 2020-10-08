var structure = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    price_gap: {
        type: Number,
        required: false
    },
    keyword: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
});
structure.set('timestamps', true);
module.exports = promofier.model('alert', structure);