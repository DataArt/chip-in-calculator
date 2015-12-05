Polymer({
    is: "cic-result",
    properties: {
        result: {
            type: Object,
            value: function(){return {}},
            notify: true
        }
    },
    ready: function(){

    },
    _getName: function(name){
        return name || 'Somebody'
    },
    _getValue: function(value, precision){
        if (!precision)
            precision = 2;
        return value ? parseFloat(value).toFixed(precision) : 0;
    },
    _onClick: function(){
        this.fire('ok-clicked');
    }
});