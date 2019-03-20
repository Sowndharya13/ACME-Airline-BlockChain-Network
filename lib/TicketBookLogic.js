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
      


    var flightRegistry={}    
    // Check availability of flights with origin and destination
    return getAssetRegistry('org.acme.airline.flight.Flight')
        .then(function(registry){
             return query('CheckFlightsOriginAndDestination', { origin: ticketData.origin, destination : ticketData.destination})
                .then(function(result){
                    if(!result) throw new Error("No Flight is scheduled between : " + ticketData.origin + " and " + ticketData.destination + "!!!");
                    // Check seat availability
                   /* return getAssetRegistry('org.acme.airline.aircraft.Aircraft')
                            .then(function(registry){
                                return query('FlightsOriginAndDestination')
                                    .then(function(results)

                    */
                 
           

     // 1. Get the asset registry
        return getAssetRegistry('org.acme.airline.ticket.Ticket')
            .then(function(ticketRegistry){

               // 2. Get resource factory
               var  factory = getFactory();
               var  NS =  'org.acme.airline.ticket';
               // generate the ticketID
               // 2.1 Set the ticketId, ticketNumber ... 
               // 3. Create the Resource instance
               //DateTime bookingTime = new Date().getTime();

             
               //var ticketNumber = getDate() + tNumber++  ;
               var ticketId =generateTicketId(timeNow); 
               
               //var ticketId = "T" + num++ + "-" + new Date().getTime();
               
               //var  ticketId = generateTicketId(ticketData.flightId,ticketData.timeOfBooking); ///Solution to exercise - Removed hardcoded value & invoked
               var  ticket = factory.newResource(NS,'Ticket', ticketId);
               // 5. Create a new concept using the factory & set the data in it
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
                    
               ticket.ticketId = ticketId;
               ticket.numberOfSeatsBooked = ticketData.numberOfSeatsToReserve;
               ticket.seatClass = ticketData.seatClass;
             //  ticket.timeOfBooking = new Date().getTime() ; 
               ticket.ticketStatus = "BOOKED";
               ticket.rewardPointForTicket = rewardPointForTicket * ticketData.numberOfSeatsToReserve;
               ticket.origin = ticketData.origin;
               ticket.destination =  ticketData.destination;
               ticket.dateOfJourney =ticketData.dateOfJourney;
               return ticketRegistry.addAll([ticket]);
           // 6. Emit the event TicketBooked
               var event = getFactory().newEvent('org.acme.airline.ticket', 'TicketBooked');
               event.ticketId = ticket.ticketId;
               emit(event);
            });

        }).catch(function(error){
            throw new Error(error);
        });    
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
    generateTicketId.counter += 1 ;
    // console.log(dayNum,month,dt.getFullYear())

    return 'TIC' + generateTicketId.counter+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(0,4);
}


