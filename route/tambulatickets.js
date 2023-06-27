const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/tambulatickets');
const passport = require('passport');
const fs= require('fs');



//create tambula tickets
router.post('/tambula/tickets', async (req, res) => {
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


    function getRandomNumbers(min, max, count) {
        var numbers = [];
      
        while (numbers.length < count) {
          var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      
          // Check if the number already exists in the array
          if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
          }
        }
      
        return numbers;
    }

var column1 = getRandomNumbers(1, 10, 10);
var column2 = getRandomNumbers(11, 20, 10);
var column3 = getRandomNumbers(21, 30, 10);
var column4 = getRandomNumbers(31, 40, 10);
var column5 = getRandomNumbers(41, 50, 10);
var column6 = getRandomNumbers(51, 60, 10);
var column7 = getRandomNumbers(61, 70, 10);
var column8 = getRandomNumbers(71, 80, 10);
var column9 = getRandomNumbers(81, 90, 10);

function create(){
    
    const ticket = [];
    
    for(let i=0;i<3;++i){
    
    
    
    const random_no = Array.from({ length: 9 }, (_, i) => i );

	// Shuffle the numbers randomly
    
	for (let i = random_no.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * 8);
		[ random_no[i], random_no[j] ] = [ random_no[j], random_no[i] ];
	}

    
        const arr = new Array(9).fill(0);
        let count=0;
        for(let i=0;i<9;++i){
          if(count == 5) break;
          var val = random_no[i];
          if(val == 0){
            if(column1.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column1[0];
            column1.shift();
          }else if(val == 1){
            if(column2.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column2[0];
            column2.shift();
          }else if(val == 2){
            if(column3.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column3[0];
            column3.shift();
          }else if(val == 3){
            if(column4.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column4[0];
            column4.shift();
          }else if(val == 4){
            if(column5.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column5[0];
            column5.shift();
          }else if(val == 5){
            if(column6.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column6[0];
            column6.shift();
          }else if(val == 6){
            if(column7.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column7[0];
            column7.shift();
          }else if(val == 7){
            if(column8.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column8[0];
            column8.shift();
          }else{
            if(column9.length == 0) {
              continue ; 
            }
            count= count+1;
            arr[val] = column9[0];
            column9.shift();
          }
        }
    ticket.push(arr); 
    }
    
    return ticket;   
}

for(let i=0; i<6;++i){
  const numbers = create();
  tickets.push(numbers);

}
return tickets; 
  
}




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




// Fetch all Tambula tickets

router.get('/tickets/tambula', async (req,res)=>{
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

router.get('/tickets/tambula/all', async (req,res)=>{
    try {
		
        let foundtickets = await Ticket.find({});
		
		res.json({foundtickets});
        
        
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
