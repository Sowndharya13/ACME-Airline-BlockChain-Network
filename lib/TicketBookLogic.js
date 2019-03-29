/*eslint no-useless-rename: ["error", { ignoreImport: true }]*/
//import { Query } from "composer-common";
/**
 * Create Ticket Transaction
 * @param {org.acme.airline.ticket.BookTicket} ticketData
 * @transaction
 */


function  BookTicket(ticketData){

    /**
     * 1. Validate the Date Of Journey 
     * If the date is a past date then throw an error
     */
    var timeNow = new Date().getTime();
    var schedTime = new Date(ticketData.dateOfJourney).getTime();
    if(schedTime < timeNow){
        throw new Error("Date Of Journey cannot be in the past. Please change it to continue!!!");
    }
  
    return getAssetRegistry('org.acme.airline.flight.Flight')
        .then(function(registry){
            
    
      // Check availability of flights with origin and destination
  
             return query('QUERY1', { origin: ticketData.origin, destination : ticketData.destination})
                 .then(function(result){
                      if(result.length < 1){
                      throw new Error("No Flight is scheduled between : " + ticketData.origin + " and " + ticketData.destination );
                      }   
             
       var myJSON = JSON.stringify(result);
     // 1. Get the asset registry
    
               var fligh=myJSON.split("flightId\":\"")[1];
               fligh = fligh.split("\"")[0];
               var passengerDateOfJourney = JSON.stringify(ticketData.dateOfJourney);
               var passengerDateOfJourney = passengerDateOfJourney.split("T")[0];
                
              return getAssetRegistry('org.acme.airline.flight.Flight')
                .then(function(flightRegistry){
                    return flightRegistry.get(fligh);  
                            })
                            .then(function(specificFlight){
                                    var flightScheduleDate = JSON.stringify(specificFlight.schedule); 
                                    var flightScheduleDate = flightScheduleDate.split("T")[0];
                                if(flightScheduleDate !==passengerDateOfJourney ){
                                    throw new Error("  This flight is not available on your journey date . You can book your tickets for this flight on "+ flightScheduleDate + " !!! ");
                                }    
                                if(!specificFlight.aircraft){
                                    throw new Error("  Aircraft is not assigned for this flight !!! ");
                                    } 

       var res = myJSON.split("#")[1];
       res = res.split("\"")[0]; 

               return getAssetRegistry('org.acme.airline.aircraft.Aircraft')
                 .then(function(aircraftRegistry){
                 return aircraftRegistry.get(res);  
               })
               .then(function(specificAircraft){
                        if(ticketData.seatClass == "FIRSTCLASS") {
                                        
                            if(specificAircraft.FIRSTCLASS < ticketData.numberOfSeatsToReserve ){
                            throw new Error("  "+ ticketData.numberOfSeatsToReserve +" tickets are not available in : " + ticketData.seatClass );
                            }    
                    }else if(ticketData.seatClass == "BUSINESSCLASS"){
                        if(specificAircraft.BUSINESSCLASS < ticketData.numberOfSeatsToReserve ){
                            throw new Error(" "+ ticketData.numberOfSeatsToReserve +"tickets are not available in : " + ticketData.seatClass );
                        }
                    }else{
                        if(specificAircraft.ECONOMYCLASS < ticketData.numberOfSeatsToReserve ){
                            throw new Error(" "+ ticketData.numberOfSeatsToReserve +"tickets are not available in : " + ticketData.seatClass );
                        }

                    }
           var OKIO = getCurrentParticipant();
           var str = JSON.stringify(OKIO);
           var partnerAgency = str.split("participantKey\":\"")[1];
           partnerAgency = partnerAgency.split("\",")[0];  
                 
                  var rewardPointForTicket = 0;
               
               // Reward Calculation Based on Ticket Class
                    if(ticketData.seatClass == "FIRSTCLASS"){
                        rewardPointForTicket = rewardPointForTicket + 5 ;  
                    }else if(ticketData.seatClass == "BUSINESSCLASS"){
                        rewardPointForTicket = rewardPointForTicket + 7 ;  
                    }
                    else{
                        rewardPointForTicket = rewardPointForTicket + 3 ;  
                    }
                 
        return getAssetRegistry('org.acme.airline.ticket.Ticket')
            .then(function(ticketRegistry){
             
          
               // 2. Get resource factory
               var  factory = getFactory();
               var  NS =  'org.acme.airline.ticket';
             
               //var ticketNumber = getDate() + tNumber++  ;
               var ticketId =generateTicketId(timeNow); 
               
               //var  ticketId = generateTicketId(ticketData.flightId,ticketData.timeOfBooking); ///Solution to exercise - Removed hardcoded value & invoked
               var  ticket = factory.newResource(NS,'Ticket', ticketId);
               // 5. Create a new concept using the factory & set the data in it
              
                    
               ticket.ticketId = ticketId;
               ticket.numberOfSeatsBooked = ticketData.numberOfSeatsToReserve;
               ticket.seatClass = ticketData.seatClass;
             //  ticket.timeOfBooking = new Date().getTime() ; 
               ticket.participantKey = partnerAgency;
               ticket.ticketStatus = "BOOKED";
               ticket.rewardPointForTicket = rewardPointForTicket * ticketData.numberOfSeatsToReserve;
               ticket.flightIdentity =fligh ;
               ticket.origin = ticketData.origin;
               ticket.destination =  ticketData.destination;
               ticket.dateOfJourney =ticketData.dateOfJourney;
           // 6. Emit the event TicketBooked
               var event = getFactory().newEvent('org.acme.airline.ticket', 'TicketBooked');
               event.ticketId = ticket.ticketId;
               emit(event);
               return ticketRegistry.addAll([ticket]);
          
    }).then(function(){

            ////UPDATE ASSET REGISTRY
            return getAssetRegistry('org.acme.airline.aircraft.Aircraft')
            .then(function(aircraftRegistry){ 

                    if(ticketData.seatClass == "FIRSTCLASS") {
                        specificAircraft.FIRSTCLASS =  specificAircraft.FIRSTCLASS - ticketData.numberOfSeatsToReserve;
                    return aircraftRegistry.update(specificAircraft);               
                        
                    }else if(ticketData.seatClass == "BUSINESSCLASS"){
                        specificAircraft.BUSINESSCLASS =  specificAircraft.BUSINESSCLASS - ticketData.numberOfSeatsToReserve;
                        return aircraftRegistry.update(specificAircraft); 
                    }else{
                        specificAircraft.ECONOMYCLASS =  specificAircraft.ECONOMYCLASS - ticketData.numberOfSeatsToReserve;
                    return aircraftRegistry.update(specificAircraft); 
                    }

     
                               
       }).then(function(){
            ////UPDATE Participant REGISTRY
            return getParticipantRegistry('org.acme.airline.participant.B2BPartner')
            .then(function(participantRegistry){ 
                return participantRegistry.get(partnerAgency);  
               })
               .then(function(specificPartnerAgency){ 
                return getParticipantRegistry('org.acme.airline.participant.B2BPartner')
                .then(function(participantRegistry){ 
                    
              var oldRewardPoints = specificPartnerAgency.balanceRewardPoints ;
              specificPartnerAgency.balanceRewardPoints = oldRewardPoints + (rewardPointForTicket * ticketData.numberOfSeatsToReserve) ;
                    return participantRegistry.update(specificPartnerAgency); 
                  

                });        
        
       });   
       });
   
    });

  });    
}); 

}); 
}).catch(function(error){
    throw new Error(error);
}); 


}

function generateTicketId( timeNow){
    var dt = new Date(timeNow)

    // Date & Month needs to be in the format 01 02 
    // so add a '0' if they are single digits
    var month = dt.getMonth()+1;
    if((month+'').length == 1)  month = '0'+month;
    var dayNum = dt.getDate();
    if((dayNum+'').length == 1)  dayNum = '0'+dayNum;
 
    // console.log(dayNum,month,dt.getFullYear())

    return 'TIC' + Math.random() +'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(0,4);
}