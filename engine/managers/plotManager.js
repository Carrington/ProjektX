//jshint moz:true
var Bacon = require('./node_modules/Bacon').Bacon;

let module;

module.exports = {
  plotManager: (function () {
    let mgr;
    
    /**
     * Plot Manager examines the merged stream and
     * directs delegate properties to adjust 
     * themselves accordingly.  
     **/
    mgr = {
      busStream: new Bacon.Bus(),
      plugStream: function ( stream ) {
        if (stream instanceof Bacon.EventStream) {
          this.busStream.plug(stream);
        }
      },
      processEvents: function() { 
        //figure out how to delegate stuff
      },
      destroy: function() {
        this.busStream.end();
      }
    };
    
    mgr.busStream.onValue(mgr.processEvents);    
    return mgr;

  })() 
};
