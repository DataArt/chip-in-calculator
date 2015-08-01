Polymer({
    is: "cic-result",
    properties: {
        result: {
            type: Object,
            value: function(){return {}},
            notify: true
        }
    },
    show: function(){
        this.$.dialog.open();
    },
    _getName: function(name){ return name || 'Somebody' },
    _getValue: function(value){
        return value ? parseFloat(value).toFixed(2) : 0;
    }
});