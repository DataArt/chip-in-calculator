Polymer({
    is: "cic-spinner",

    properties: {
        "active": {
            type: Boolean,
            value: false
        }
    },

    startSpinner: function(){
        this.active=true;
    },

    stopSpinner: function(){
        this.active=false;
        this.fire('stop');
    },

});
