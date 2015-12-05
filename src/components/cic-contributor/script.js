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
        index: {
            type: Number
        }
    },
    destroy: function(){ this.fire('destroy', this.index) },
    ready: function(){
        // focus the name input when ready
        this._focus( this.$$('#name').$$('input') );
    },
    _focus: function(element){
        window.setTimeout(function(){
            element.focus()
        }, 0);
    },
    _onKeyPress: function(e){
        if (e.keyCode === 13)
            if (e.target.getAttribute('type') === 'number')
                this.fire('enter-press');
            else
                this._focus( this.$$('#value').$$('input') );
    }
});