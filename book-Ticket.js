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
 var tNumber = 100;

 const bnUtil = require('../bn-connection-util');
 const ticketNamespace = 'org.acme.airline.ticket';
 const transactionType = 'BookTicket';
   
    // Change this for populating other versions
bnUtil.cardName='admin@airlinev14';
if(process.argv.length < 3){
    console.log("Usage: node populate-acme-airline <card-name> ")
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
        bookTicket('AE178-12-09-2019',4,'FIRSTCLASS','EWR','ATL','SRM-Agencies');
    }
    function bookTicket(flightId, numberOfSeatsToReserve, seatClass, origin, destination, partnerAgencyName){
     //if available..generate ticketId and mark the tickets
     let tickets = [];
     const  bnDef = bnUtil.connection.getBusinessNetwork();
     const  factory = bnDef.getFactory();
     var bookingTime = new Date().getTime();

     ticket.ticketNumber = date + tNumber++  ;

     var ticketId = ticket.ticketNumber +"-" +bookingTime;
     let transaction = factory.newTransaction(ticketNamespace,transactionType); 
     transaction.setPropertyValue('ticketNumber',ticketNumber);
     transaction.setPropertyValue('flightId',flightId);
     transaction.setPropertyValue('numberOfSeatsToReserve',numberOfSeatsToReserve);
     transaction.setPropertyValue('seatClass',seatClass);
     transaction.setPropertyValue('orgin', origin);
     transaction.setPropertyValue('destination' , destination );
     transaction.setPropertyValue('timeOfBooking' , bookingTime);
     transaction.setPropertyValue('partnerAgencyName', partnerAgencyName);
     
     bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log('Successfully booked a new ticket  : ',number);
        //To block the tickets in the flight
        // updateSeat();

    }).catch((error)=>{
        console.log(error);
        bnUtil.connection.disconnect();
    })         
}             
                