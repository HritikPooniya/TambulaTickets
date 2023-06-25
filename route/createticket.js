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
	const createdticket = [];

	
	const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
  
	
	for (let i = numbers.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ numbers[i], numbers[j] ] = [ numbers[j], numbers[i] ];
	}
 

	
	for (let i = 0; i < 6; i++) {
		const ticket_col = [];

		// Add numbers to each row
		for (let j = 0; j < 3; j++) {
			const col = numbers.splice(0, 5);
      
			ticket_col.push(col);
		}

		// Add zeros or 'x' to fill the blank cells
		for (let j = 0; j < 3; j++) {
			const missingCount = 9 - ticket_col[j].length;
			if (missingCount > 0) {
				ticket_col[j] = ticket_col[j].concat(Array.from({ length: missingCount }, () => 0));
			}
		}

		createdticket.push(ticket_col);
	}

	return createdticket;
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
