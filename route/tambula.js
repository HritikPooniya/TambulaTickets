const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/tambulatickets');
const passport = require('passport');
var tambola =require('tambola');




//create tambula tickets
router.post('/tambula', async (req, res) => {
	try {

        const ticketNumber = generatetambulatickets();
        
        
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
function generatetambulatickets(){
    const tickets = [];
    function createticket(){
        var ticketNumber = tambola.generateTicket();
        return ticketNumber;
    
    }
    for(let i=0;i<6;i++){
        const ticket = createticket();
        tickets.push(ticket);

    }
    return tickets;

}




// Fetch all Tambula tickets

router.get('/tambula/tickets', async (req,res)=>{
    try {
		
        let foundtickets = await Ticket.find({});
		// const objdata = JSON.stringify(foundtickets);
		// res.json({foundtickets});
        res.render('tambulatickets',{foundtickets});
        
    } catch (error) {
        console.error(error);
		res.status(500).json({ error: 'Failed to fetch ticket' });
        
    }
})

router.get('/tambula/tickets/all', async (req,res)=>{
    try {
		
        let foundtickets = await Ticket.find({});
		
		res.json({foundtickets});
        
        
    } catch (error) {
        console.error(error);
		res.status(500).json({ error: 'Failed to fetch ticket' });
        
    }
})



//fetch ticket by ubique id

router.get('/tambula/tickets/:id', async (req, res) => {
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
