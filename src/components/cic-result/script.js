Polymer({
    is: "cic-result",
    properties: {
        result: {
            type: Object,
            value: function(){return {}},
            notify: true
        }
    },
    show: function(){ this.fire('shown') },
    hide: function(){ this.fire('hidden') },
    _getName: function(name){ return name || 'Somebody' },
    _getValue: function(value, precision){
        if (!precision)
            precision = 2;
        return value ? parseFloat(value).toFixed(precision) : 0;
    }
});