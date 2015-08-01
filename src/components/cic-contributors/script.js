Polymer({
    is: "cic-contributors",
    properties: {
        contributors: {
            type: Array,
            value: function(){return []},
            notify: true
        }
    },
    destroy: function(e){
        var index = e.detail;
        this.splice('contributors', index, 1);
    },
    add: function(){
        this.push('contributors', this.$.utils.clone(this._emptyContributor));
    },
    _emptyContributor: {"name":"", "value":0}
});