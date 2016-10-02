Polymer({

    is: "cic-main",

    behaviors: [
        i18nMsgBehavior
    ],

    properties: {
        // ex: [{"name":"foo","value":123},{"bar":"123","value":1234}]
        "contributors": {
            type: Array,
            value: function(){return []}
        },
        "isReadyToCalculate": {
            type: Boolean,
            value: false
        }
    },

    observers: [
        '_contributorsChanged(contributors.*)'
    ],

    ready: function(){
        this.$.router.init();
        this.$.i18n.loadLocales();
    },

    showResults: function(){
        this._hideResultsButton();
        this.$.spinner.startSpinner();
        this.$.parse.save(this.contributors);
    },

    onParseSaved: function(e){
        // redirect to /r/<hash>
        // where <hash. is e.detail
        this.$.router.redirect('r', e.detail);
    },

    hideResults: function(){
        this.result = {};
        this._goHome();
    },

    add: function(){
        this.$.contributors.add();
    },

    // change the view according to the router state
    pageChanged: function(e){
        if (!e || !e.detail || !e.detail.page)
            return;

        var page = e.detail.page,
            params = e.detail.params || null,
            selected = 0;

        if (page == 'r') {

            selected = 1;
            this.$.parse.load(params.pointer, function(contributors){
                this.contributors = contributors;
                this.result = this._calculate( this.$.utils.clone(contributors) );
                this._stopSpinners();
            }.bind(this));
        } else if (page == 'home') {
            if (this.contributors.length == 0)
                this.add();
            selected = 0
        }

        this.$.pages.setAttribute('selected', selected);
    },

    /**
     * returns {"equalPayment":178.5,"totalValue":357,"values":[{"from":"foo","to":"bar","value":55.5}]}
     * @param contributors
     * @returns {*}
     * @private
     */
    _calculate: function(_contributors){
        if (!this.isReadyToCalculate)
            return this.result = {};

        return this.$.utils.calculate(_contributors);
    },

    _readyToCalculateResults: function(){
        return this.contributors.length > 1
    },

    _contributorsChanged: function(){
        this.contributors.forEach(function(d){
            d.value = parseFloat(d.value) || 0;
        });
        this.isReadyToCalculate = this._readyToCalculateResults();
        this.$['show-results'].disabled = !this.isReadyToCalculate;
    },

    _goHome: function(){
        this.$.router.redirect('home');
    },

    _hideResultsButton: function(){
        this.$['show-results'].style.color='transparent';
    },

    _restoreResultsButton: function(){
        this.$['show-results'].style.color='';
    },

    _stopSpinners: function(){
        this.$.spinner.stopSpinner();
        this.$.result.$.spinner.stopSpinner();
    }

});
