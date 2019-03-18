import { Query } from "composer-common";

/**
 * Create Ticket Transaction
 * @param {org.acme.airline.ticket.BookTicket} ticketData
 * @transaction
 */
var num=100; 

function  BookTicket  (ticketData){
    var flightRegistry={}    
    // Check availability of flights with origin and destination
    return getAssetRegistry('org.acme.airline.flight.Flight')
        .then(function(registry){
             return query('FlightsOriginAndDestination')
                .then(function(results){
                    if(!results) throw new Error("No Flight is scheduled between : " + ticketData.origin + " and " + ticketData.destination + "!!!");
                    /* Check seat availability
                    return getAssetRegistry('org.acme.airline.aircraft.Aircraft')
                            .then(function(registry){
                                return query('FlightsOriginAndDestination')
                                    .then(function(results)
                */
                 // Now create a ticket
             
               // 2. Get resource factory
               var  factory = getFactory();
               var  NS =  'org.acme.airline.ticket';
               // generate the ticketID
               // 2.1 Set the ticketId, ticketNumber ... 
               // 3. Create the Resource instance
               var bookingTime = new Date().getTime();

               //var ticketNumber = getDate() + tNumber++  ;
             
               var ticketId = "T"+num++ + "-" +bookingTime;
               
               //var  ticketId = generateTicketId(ticketData.flightId,ticketData.timeOfBooking); ///Solution to exercise - Removed hardcoded value & invoked
               var  ticket = factory.newResource(NS,'Ticket',ticketData.ticketId);
               // 5. Create a new concept using the factory & set the data in it
               let rewardForThisTicket = 0;
      
               flight.route = route;
               flight.aliasFlightNumber = [];
               
               // Reward Calculation Based on Ticket Class
                    if(ticketData.seatclass == "FIRSTCLASS"){
                        rewardForThisTicket = rewardForThisTicket + 5 ;  
                    }else if(ticketData.seatclass == "BUSINESSCLASS"){
                        rewardForThisTicket = rewardForThisTicket + 7 ;  
                    }
                    else{
                        rewardForThisTicket = rewardForThisTicket + 3 ;  
                    }
                    
               ticket.ticketId = ticketId;
               ticket.numberOfSeatsBooked = ticketData.numberOfSeatsToReserve;
               ticket.seatclass = ticketData.seatclass;
               ticket.timeOfBooking = bookingTime ; 
               ticket.ticketStatus = "BOOKED";
               ticket.rewardPointForTicket = rewardForThisTicket * ticketData.numberOfSeatsBooked;
            }) } .then(function(){
                // Successful update
               // 6. Emit the event TicketBooked
               var event = factory.newEvent(NS, 'TicketBooked');
               event.ticketId = ticketId;
               emit(event);
   
               return ticketRegistry.addAll([ticket]);
            }       
    }




/*
// import { Query } from "composer-common";

/**
 * Create Ticket Transaction
 * @param {org.acme.airline.ticket.BookTicket} ticketData
 * @transaction
 */
//var tNumber = 100;

/*
function  bookTicket(ticketData) {
   
       // 1. Get the asset registry
        let ticketRegistry =   getAssetRegistry('org.acme.airline.ticket')
        let flightRegistry =   getAssetRegistry('org.acme.airline.flight')
        
              
            // Point 1: Check whther a flight is scheduled for given origin and destination on the received date
            // Point 2: Check whther seats are available in the mentioned Class
            // Point 3: Book Ticket (Update the asset registry)
            
            var origin_airport = ticketData.origin ; 
            var destination_airport = ticketData.destination ;
            var date_of_journey = ticketData.dateOfJourney;
            console.log(isScheduled); 
            var isScheduled = []
            ischeduled = query('FlightsOriginAndDestination', {origin_airport,destination_airport }); //Have to write query for matching date in flightId 
            if(ischeduled.length >0){
                          
           
            // Now create a ticket
               
               // 2. Get resource factory
               var  factory = getFactory();
               var  NS =  'org.acme.airline.ticket';
               // generate the ticketID
               // 2.1 Set the ticketId, ticketNumber ... 
               // 3. Create the Resource instance
               var bookingTime = new Date().getTime();

               //var ticketNumber = getDate() + tNumber++  ;
               var num=100; 
               var ticketId = num++ + "-" +bookingTime;
               
               //var  ticketId = generateTicketId(ticketData.flightId,ticketData.timeOfBooking); ///Solution to exercise - Removed hardcoded value & invoked
               var  ticket = factory.newResource(NS,'Ticket',ticketData.ticketId);
               // 4. Set the relationship
              
          
               // 5. Create a new concept using the factory & set the data in it
               let rewardForThisTicket = 0;
      
               flight.route = route;
               flight.aliasFlightNumber = [];
               
               // Reward Calculation Based on Ticket Class
                    if(ticketData.seatclass == "FIRSTCLASS"){
                        rewardForThisTicket = rewardForThisTicket + 5 ;  
                    }else if(ticketData.seatclass == "BUSINESSCLASS"){
                        rewardForThisTicket = rewardForThisTicket + 7 ;  
                    }
                    else{
                        rewardForThisTicket = rewardForThisTicket + 3 ;  
                    }
                    
               ticket.ticketId = ticketId;
               ticket.numberOfSeatsBooked = ticketData.numberOfSeatsToReserve;
               ticket.seatclass = ticketData.seatclass;
               ticket.timeOfBooking = bookingTime ; 
               ticket.ticketStatus = "BOOKED";
               ticket.rewardPointForTicket = rewardForThisTicket * ticketData.numberOfSeatsBooked;
            
               // 6. Emit the event TicketBooked
               var event = factory.newEvent(NS, 'TicketBooked');
               event.ticketId = ticketId;
               emit(event);
   
               return ticketRegistry.addAll([ticket]);
           }
           */
        
