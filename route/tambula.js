const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/tambulatickets');
const passport = require('passport');
var tambola =require('tambola');
const { default: Tambola, TambolaTicket } = require('tambola-generator');




//create tambula tickets
router.post('/tambula', async (req, res) => {
	try {

        // const ticketNumber = generatetambulatickets();
		const ticketNumber =generateTickets();
        // console.log("tickets");
        // console.log(ticketNumber);
		const ticket = new Ticket({ ticketNumbers: ticketNumber });
        
		await ticket.save();

		res.json({ ticketId: ticket._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create ticket' });
	}
});

// Generate unique ticket numbers
const generateTickets = ()=>{



	const tickets = [];
		function getRandomNumbers(min, max, count) {
			let numbers = [];
		  
			while (numbers.length < count) {
			  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		  
			  // Check if the number already exists in the array
			  if (!numbers.includes(randomNumber)) {
				numbers.push(randomNumber);
			  }
			}
			return numbers;
		}
	
	let column1 = getRandomNumbers(1 , 9, 9);
	let column2 = getRandomNumbers(10, 19, 10);
	let column3 = getRandomNumbers(20, 29, 10);
	let column4 = getRandomNumbers(30, 39, 10);
	let column5 = getRandomNumbers(40, 49, 10);
	let column6 = getRandomNumbers(50, 59, 10);
	let column7 = getRandomNumbers(60, 69, 10);
	let column8 = getRandomNumbers(70, 79, 10);
	let column9 = getRandomNumbers(80, 90, 11);
	
	
	function solve(numberofticket){
		
		const ticket = [];
		
		for(let i=0 ; i<3 ; ++i){
		  const random_no = getRandomNumbers(0,8,9);
	
	 
	 
			const arr = new Array(9).fill(0);
			let cnt = 1,
				i = 0;
			while (cnt <= 5 && i < 9) {
				var val = random_no[i];
				if (val == 0 && column1.length > 0) {
					arr[val] = column1[0];
					column1.shift();
					++cnt;
				} else if (val == 1 && column2.length > 0) {
					arr[val] = column2[0];
					column2.shift();
					++cnt;
				} else if (val == 2 && column3.length > 0) {
					arr[val] = column3[0];
					column3.shift();
					++cnt;
				} else if (val == 3 && column4.length > 0) {
					arr[val] = column4[0];
					column4.shift();
					++cnt;
				} else if (val == 4 && column5.length > 0) {
					arr[val] = column5[0];
					column5.shift();
					++cnt;
				} else if (val == 5 && column6.length > 0) {
					arr[val] = column6[0];
					column6.shift();
					++cnt;
				} else if (val == 6 && column7.length > 0) {
					arr[val] = column7[0];
					column7.shift();
					++cnt;
				} else if (val == 7 && column8.length > 0) {
					arr[val] = column8[0];
					column8.shift();
					++cnt;
				} else if (val == 8 && column9.length > 0) {
					arr[val] = column9[0];
					column9.shift();
					++cnt;
				}
				++i;
			}
		
			
		ticket.push(arr); 
		}
	  
		
		const validticket = check(ticket);
	   
	   
		return validticket;
		// tickets.push(validticket);
		
		 
	}
	
	
	
	
	
	
	
	
	const check = (ticket)=>{
	  let t = false;
	  for(let i = 0 ; i < 9 ; i++){
		if(ticket[0][i] == 0){
		  if(ticket[1][i] == 0){
			if(ticket[2][i] == 0){
			  if(i == 0){
				ticket[2][i] = column1[0];
				column1.shift();
			  }
			  else if(i == 1){
				ticket[2][i] = column2[0];
				column2.shift();
			  }
			  else if(i == 2){
				ticket[2][i] = column3[0];
				column3.shift();
			  }
			  else if(i == 3){
				ticket[2][i] = column4[0];
				column4.shift();
			  }
			  else if(i == 4){
				ticket[2][i] = column5[0];
				column5.shift();
			  }
			  else if(i == 5){
				ticket[2][i] = column6[0];
				column6.shift();
			  }
			  else if(i == 6){
				ticket[2][i] = column7[0];
				column7.shift();
			  }
			  else if(i == 7){
				ticket[2][i] = column8[0];
				column8.shift();
			  }
			  else if(i == 8){
				ticket[2][i] = column9[0];
				column9.shift();
			  }
			  t=true;
			  
			 
			}
		  }
		}
	  }
	  if(t){
		for(let i = 0 ; i < 9 ; i++){
		  if(ticket[0][i]!=0){
			if(ticket[1][i]!=0){
			  if(ticket[2][i]!=0){
				
				if(i == 0){
				  column1.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 1){
				  column2.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 2){
				  column3.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 3){
				  column4.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 4){
				  column5.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 5){
				  column6.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 6){
				  column7.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 7){
				  column8.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				else if(i == 8){
				  column9.push(ticket[2][i]);
				  ticket[2][i]= 0;
				}
				break;
			  }
			}
		  }
		}
	  }
	  return ticket;
	
	}
	
	for(let i=1; i<7;++i){
	  
	   const h = solve(i);
	   tickets.push(h);
	   
	  
	}
	for(let i=0;i<3;i++){
	  let count=0;
	  for(let j=0;j<9;j++){
		if(tickets[5][i][j]==0 || tickets[5][i][j]==undefined){
		  count++;
		  tickets[5][i][j]=0;
		}
	  }
	  if(count>4){
		while(count!=4){
		  if(column1.length>0 && tickets[5][i][0]==0){
			tickets[5][i][0]=column1[0];
			column1.shift();
	
		  }else if(column2.length>0 && tickets[5][i][1]==0){
			tickets[5][i][1]=column2[0];
			column2.shift();
	
		  }else if(column3.length>0 && tickets[5][i][2]==0){
			tickets[5][i][2]=column3[0];
			column3.shift();
	
		  }else if(column4.length>0 && tickets[5][i][3]==0){
			tickets[5][i][3]=column4[0];
			column4.shift();
	
		  }else if(column5.length>0 && tickets[5][i][4]==0){
			tickets[5][i][4]=column5[0];
			column5.shift();
	
		  }else if(column6.length>0 && tickets[5][i][5]==0){
			tickets[5][i][5]=column6[0];
			column6.shift();
	
		  }else if(column7.length>0 && tickets[5][i][6]==0){
			tickets[5][i][6]=column7[0];
			column7.shift();
	
		  }else if(column8.length>0 && tickets[5][i][7]==0){
			tickets[5][i][7]=column8[0];
			column8.shift();
	
		  }else if(column9.length>0 && tickets[5][i][8]==0){
			tickets[5][i][8]=column9[0];
			column9.shift();
	
		  }
		  count--;
		}
	  }
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
