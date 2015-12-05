Polymer({
    is: "cic-footer",
    properties: {
        "isDonateHidden": {
            type: Boolean,
            value: true
        }
    },
    ready: function(){

    },
    _toggleDonation: function(){
        this.isDonateHidden = !this.isDonateHidden;
    }
});