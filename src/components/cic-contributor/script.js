Polymer({
    is: "cic-contributor",
    properties: {
        name: {
            type: String,
            value: 'Name',
            notify: true
        },
        value: {
            type: Number,
            value: 0,
            notify: true
        },
        index: { type: Number }
    },
    destroy: function(){ this.fire('destroy', this.index) },
    ready: function(){
        // focus the name input when ready
        var element = this.$$('#name').$$('input');
        window.setTimeout(function(){
            element.focus()
        }, 0);
    },
    _onKeyPress: function(e){
        if(e.keyCode === 13)
            this.fire('enter-press');
    }
});