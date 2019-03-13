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
 const ticketsNamespace = 'org.acme.airline.ticket';
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


    function bookTicket(registry){

     //if available..generate ticketId and mark the tickets


    ticketResource.setPropertyValue('ticketNumber','TK001-AE101');
    ticketResource.setPropertyValue('flightId','AE101-12-09-2019');
    ticketResource.setPropertyValue('numberOfSeatsBooked','4');
    ticketResource.setPropertyValue('orgin', 'EWR');
    ticketResource.setPropertyValue('destination' , 'ATL');
    ticketResource.setPropertyValue('schedule' , new Date('2019-10-15T21:44Z'));
    ticketResource.setPropertyValue('participantKey','SRM-Agencies');
    return registry.add(ticketResource).then(()=>{
        console.log('Successfully Booked a ticket!!!');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

