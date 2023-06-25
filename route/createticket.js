const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/tambulatickets');
const passport = require('passport');


//create tambula tickets
router.post('/tickets', async (req, res) => {
	try {

		const ticketNumber = generateTicket();
		//database work
		const ticket = new Ticket({ ticketNumbers: ticketNumber });
        console.log(ticket);
		await ticket.save();

		res.json({ ticketId: ticket._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create ticket' });
	}
});

// Generate unique ticket numbers

function generateTicket() {
	const tickets = [];
	for(let j=0;j<6;++j){
		const ticket = create();
		tickets.push(ticket);
	}
	return tickets;
}

function create(){
    const ticket = [];
    for(let i=0;i<3;++i){
        const arr = new Array(9).fill(0);
        for(let i=0;i<5;++i){
        
        const a = Math.floor(Math.random()*(90))+1;
        
        const j=Math.floor(Math.random()*(8));
        arr[j] = a;
        }
    ticket.push(arr); 
    }
    return ticket;  
}


// Fetch all Tambula tickets

router.get('/tickets/tambula', async (req,res)=>{
    try {
        let foundtickets = await Ticket.find({});
        res.send({ foundtickets });
        
    } catch (error) {
        console.error(error);
		res.status(500).json({ error: 'Failed to fetch ticket' });
        
    }
})


//fetch ticket by ubique id

router.get('/tickets/:id', async (req, res) => {
	try {
		const { id } = req.params;

		// Fetch the ticket from the database
		const ticket = await Ticket.findById(id);

		if (!ticket) {
			return res.status(404).json({ error: 'Ticket not found' });
		}

		res.json({ ticket });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch ticket' });
	}
});

module.exports = router;
