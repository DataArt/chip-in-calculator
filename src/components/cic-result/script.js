Polymer({
    is: "cic-result",

    behaviors: [
        i18nMsgBehavior
    ],

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
        },
        rounding: {
            type: Number,
            value: -1
            //Paper-dropdown got a bug: https://github.com/PolymerElements/paper-dropdown-menu/issues/197
            //So if here will be a real value (0-3) dropdown will be broken like this: http://i.imgur.com/IRWBeZm.png (because of i18n loading)
        }
    },
    ready: function(){

    },
    observers: [
        '_resultChanged(result.*)'
    ],
    _getNameFrom: function(name){

        return name || i18nMsgBehavior.properties.i18n.value.from_somebody;
    },
    _getNameTo: function(name){

        return name || i18nMsgBehavior.properties.i18n.value.to_somebody;
    },
    _getValue: function(value, rounding, precision){
        if (rounding > 0) {
            return value ? this._round(value, rounding) : 0;
        };

        if (!precision)
            precision = 2;
        return value ? parseFloat(value).toFixed(precision) : 0;
    },

    _round: function(value, rounding){
        switch (rounding) {
            case 1:
                return Math.round(value);
            case 2:
                return Math.floor(value);
            case 3:
                return Math.ceil(value);
        };
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
