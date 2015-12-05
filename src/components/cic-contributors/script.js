Polymer({
    is: "cic-contributors",

    _emptyContributor: {"name": "", "value": null},

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

        // Polymer has a bug... So we need to make the value = null
        this.contributors[this.contributors.length-1].value = null;
    }
});