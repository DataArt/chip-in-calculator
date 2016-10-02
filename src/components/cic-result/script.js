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
        this._hideOKButton();
        this.$.spinner.startSpinner();
    },
    _getLinkLabel: function(link){
        return link.substr(7);
    },

    _hideOKButton: function(){
        this.$['ok-button'].style.color='transparent';
    },

    _restoreOKButton: function(){
        this.$['ok-button'].style.color='';
    }
});
