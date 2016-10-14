Polymer({
    is: "cic-spinner",

    properties: {
        "active": {
            type: Boolean,
            value: false
        }
    },

    startSpinner: function(){
        this.parentNode.style.color = 'transparent';
        this.active=true;
    },

    stopSpinner: function(){
        this.active=false;
        this.parentNode.style.color = '';
    },

});
