const mongoose=require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const ticketSchema = new mongoose.Schema({ticketNumbers: [[[Number]]]});
const Ticket = mongoose.model('Ticket', ticketSchema);

ticketSchema.plugin(mongoosePaginate);


module.exports = Ticket;
