const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/tambulatickets');
const passport = require('passport');
const fs= require('fs');


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
const numbers =random();
function generateTicket() {
	
    
	const tickets = [];
	for(let j=0;j<6;++j){
		const ticket = create();
		tickets.push(ticket);
	}
	return tickets;
}

let itr=0;


//generate random number array of size 90 
function random(){


	const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
	
		// Shuffle the numbers randomly
		for (let i = numbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[ numbers[i], numbers[j] ] = [ numbers[j], numbers[i] ];
		}
		return numbers;
}

function create(){
    const ticket = [];
    for(let i=0;i<3;++i){
//create an array for selection of random index value;
		const random_no = Array.from({ length: 9 }, (_, i) => i );

	// Shuffle the numbers randomly
    
	for (let i = random_no.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * 8);
		[ random_no[i], random_no[j] ] = [ random_no[j], random_no[i] ];
	}


        const arr = new Array(9).fill(0);
        for(let i=0;i<5;++i){
        
			arr[random_no[i]] = numbers[itr];
			itr=itr+1;
        }
    ticket.push(arr); 
    }
    return ticket;  
}


// Fetch all Tambula tickets

router.get('/tickets/tambula', async (req,res)=>{
    try {
        let foundtickets = await Ticket.find({});
		let jsondata = JSON.stringify(foundtickets);
        res.render('tambulatickets',{foundtickets, jsondata });
        
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
