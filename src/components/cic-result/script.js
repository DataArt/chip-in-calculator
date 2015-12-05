Polymer({
    is: "cic-result",
    properties: {
        result: {
            type: Object,
            value: function(){
                return {
                    values: [],
                    totalValue: 0,
                    equalPayment: 0
                }
            },
            notify: true
        }
    },
    ready: function(){

    },
    observers: [
        '_resultChanged(result.*)'
    ],
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
    },
    _resultChanged: function(){
        this.link = this.$.router.getLocation();
    },
    _getLinkLabel: function(link){
        return link.substr(7);
    }
});