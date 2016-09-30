Polymer({
    is: "cic-spinner",

    properties: {
        spinner : {
            type: Object,
            value: {}
        }
    },

    startSpinner: function(e) {
        if (!this.spinner.active) {
            this.spinner = document.querySelector('paper-spinner');
        };
        this.spinner.active = true;
    },

    stopSpinner: function(e) {
        this.spinner.active = false;
    },

});
