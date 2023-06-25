const mongoose=require('mongoose');



const ticketSchema = new mongoose.Schema({ticketNumbers: [ [ [ Number ] ] ]});

const Ticket = mongoose.model('Ticket', ticketSchema);


module.exports = Ticket;
