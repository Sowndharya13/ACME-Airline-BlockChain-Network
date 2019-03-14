/**
 * Create Ticket Transaction
 * @param {org.acme.airline.ticket.BookTicket} ticketData
 * @transaction
 */
var tNumber = 100;

function  bookTicket(ticketData) {
   
       // 1. Get the asset registry
       return getAssetRegistry('org.acme.airline.ticket')
           .then(function(ticketRegistry){
               // Now create a ticket
   
               // 2. Get resource factory
               var  factory = getFactory();
               var  NS =  'org.acme.airline.ticket';
               // generate the ticketID
               // 2.1 Set the ticketId, ticketNumber ... 
               // 3. Create the Resource instance
               var bookingTime = new Date().getTime();

               //var ticketNumber = getDate() + tNumber++  ;

               var ticketId = ticketNumber +"-" +bookingTime;
               
               //var  ticketId = generateTicketId(ticketData.flightId,ticketData.timeOfBooking); ///Solution to exercise - Removed hardcoded value & invoked
               var  ticket = factory.newResource(NS,'Ticket',ticketData.ticketId);
               // 4. Set the relationship
              
          
               // 5. Create a new concept using the factory & set the data in it
               
      
               flight.route = route;
               flight.aliasFlightNumber = [];
                
               ticket.ticketId = ticketData.ticketId;
               ticket.ticketNumber = ticketData.ticketNumber;
               ticket.numberOfSeatsBooked = ticketData.numberOfSeatsBooked;
               ticket.seatclass = ticketData.seatclass;
               ticket.timeOfBooking = ticketData.timeOfBooking ; 
               ticket.ticketStatus = "BOOKED";
               ticket.rewardPointForTicket = 5 * numberOfSeatsBooked;
               




               // 6. Emit the event TicketBooked
               var event = factory.newEvent(NS, 'TicketBooked');
               event.ticketId = ticketId;
               emit(event);
   
               return ticketRegistry.addAll([ticket]);
           });
   }
  
   /**
    * Create Flight Transaction
    * @param {org.acme.airline.flight.AssignAircraft} flightAircraftData
    * @transaction
    * 
    * **/
   /*function    AssignAircraft(flightAircraftData){
       var flightRegistry={}
       return getAssetRegistry('org.acme.airline.flight.Flight').then(function(registry){
           flightRegistry = registry
           return flightRegistry.get(flightAircraftData.flightId);
       }).then(function(flight){
           if(!flight) throw new Error("Flight : "+flightAircraftData.flightId," Not Found!!!");
           var   factory = getFactory();
           var   relationship = factory.newRelationship('org.acme.airline.aircraft','Aircraft',flightAircraftData.aircraftId);
           flight.aircraft = relationship;
           return flightRegistry.update(flight);
       }).then(function(){
           // Successful update
           var event = getFactory().newEvent('org.acme.airline.flight', 'AircraftAssigned');
           event.flightId = flightAircraftData.flightId;
           event.aircraftId = flightAircraftData.aircraftId;
           emit(event);
       }).catch(function(error){
           throw new Error(error);
       });
   
   }

   */