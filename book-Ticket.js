'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Last Tested: Dec 21, 2018
 * Composer: 0.20.5
 * 
 * Exercise:
 * Create a new ticket resource instance and add it to the ticket Registry
 */
 // Parameter is a AssetRegistry

 const bnUtil = require('../bn-connection-util');
 const ticketNamespace = 'org.acme.airline.ticket';
 const transactionType = 'BookTicket';
   
    // Change this for populating other versions
bnUtil.cardName='admin@airlinev10';
if(process.argv.length < 3){
    console.log("Usage: node populate-acme-airline   <card-name> ")
    console.log("Populating Network using a card: ",bnUtil.cardName);
} else {
    bnUtil.cardName = process.argv[2];
    console.log("Populating Network using a card: ",bnUtil.cardName);
}
bnUtil.connect(main);
    // Check ticket availability 
    function checkAvailability(){
    

    // Write a query to check seat availablity in the given flight
  
    }
    function main(error){
        if(error){
            console.log(error)
            process.exit(1)
        }
        bookTicket('AE101-12-09-2019',4,'FIRSTCLASS','EWR','ATL', new Date() ,'SRM-Agencies');
    }
    
    function bookTicket(flightId, numberOfSeatsToReserve, seatClass, origin, destination, date, key){
     //if available..generate ticketId and mark the tickets
              
    

     let tickets = [];
     const  bnDef = bnUtil.connection.getBusinessNetwork();
     const  factory = bnDef.getFactory();

     let transaction = factory.newTransaction(ticketNamespace,transactionType); 
    // transaction.setPropertyValue('ticketNumber',number);
     transaction.setPropertyValue('flightId',flightId);
     transaction.setPropertyValue('numberOfSeatsToReserve',numberOfSeatsToReserve);
     transaction.setPropertyValue('seatClass',seatClass);
     transaction.setPropertyValue('orgin', origin);
     transaction.setPropertyValue('destination' , destination );
     transaction.setPropertyValue('schedule' , date);
     transaction.setPropertyValue('participantKey', key);
     
     bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log('Successfully booked a new ticket  : ',number);
        //To block the tickets in the flight
        // updateSeat();

    }).catch((error)=>{
        console.log(error);
        bnUtil.connection.disconnect();
    })
}  
