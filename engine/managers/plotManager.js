//jshint moz:true
var Bacon = require('./node_modules/Bacon').Bacon,
    commMgr = require('./engine/managers/communicationManager').communicationManager;

let module;

/**
 * Plot Manager examines the bus stream and
 * directs delegate properties to adjust 
 * themselves accordingly.  
 **/

module.exports = function plotManager(options) {
  let busStream = new Bacon.Bus(),
      plugStream = function ( stream ) {
        if (stream instanceof Bacon.EventStream) {
          busStream.plug(stream);
        }
      },
      manageEvent = function ( event ) {
       let contactMap = new commMgr.ContactMap(event),
           impacts = contactMap.impacts(),
           alignReaction = function ( reaction ) {
            let index;

            if (typeof options.postReactionHooks !== 'undefined') {
              for (index = 0; index < options.postReactionHooks.length; ++index) {
                //pre- and post- reaction hooks must return a valid event object,
                //which is pushed to the combined bus stream.
                busStream.push(options.postReactionHooks[index]( reaction ));
              }
            }

           },
           destroy = (options.destroy !== 'undefined') ? destroy : options.destroy,
           plugStream = (options.plugStream !== 'undefined') ? plugStream : options.plugStream,
           contact,i,index;

       for (i = 0; i < impacts.length; ++i) {
         
         contact = impacts[i];
         if (typeof options.preReactionHooks !== 'undefined') {
           for (index = 0; index < options.preReactionHooks.length; ++index) {
             //pre- and post- reaction hooks must return a valid event object,
             //which is pushed to the combined bus stream.
             busStream.push(options.preReactionHooks[index]( contact, event ));
           }
         }
         contact.enqueueReaction( event, alignReaction );

       }
       
      },
      destroy = function () {
        busStream.end();      
      };
      return manageEvent;
};
