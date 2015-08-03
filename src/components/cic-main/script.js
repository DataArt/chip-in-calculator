Polymer({
    is: "cic-main",
    properties: {
        "contributors": {
            type: Array,
            value: function(){return []}
        }
    },
    isReadyToCalculate: false,
    observers: [
        '_contributorsChanged(contributors.*)'
    ],
    ready: function(){
        this.result = {};
        this.add();
        this.isResultsShown = false;
    },
    showResults: function(){
        this.result = this._calculate( this.$.utils.clone(this.contributors) );
        this.isResultsShown = true;
        window.scrollTo(0, 0);
    },
    hideResults: function(){
        this.result = {};
        this.isResultsShown = false;
    },
    add: function(){
        this.$.contributors.add()
    },
    _calculate: function(contributors){
        if (!this.isReadyToCalculate)
            return this.result = {};

        var tmpArr = [],
            totalValue = 0,
            equalPayment = 0,
            debtors= [], lenders= [],
            lender = null, debtor = null,
            values = [], delta = 0;

        totalValue = contributors.reduce(function(p,c){return p+ c.value}, 0);
        equalPayment = totalValue/contributors.length;
        tmpArr = contributors.map(function(d){
            d.value = equalPayment - d.value;
            return d;
        });

        debtors = tmpArr.filter(function(item){return item.value > 0}); // all positive
        lenders = tmpArr.filter(function(item){return item.value < 0}); // all negative
        lender = lenders[0];
        debtor = debtors[0];
        values = [];
        delta = 0;

        while (lenders.length > 0 && debtors.length > 0) {
            lender = lender || lenders[0];
            debtor = debtor || debtors[0];
            delta = debtor.value + lender.value;

            if (delta < 0) {
                values.push({
                    from: debtor.name,
                    to: lender.name,
                    value: debtor.value
                });
                lender.value += debtor.value;
                debtor.value = 0;
            } else {
                values.push({
                    from: debtor.name,
                    to: lender.name,
                    value: -lender.value
                });
                debtor.value += lender.value;
                lender.value = 0;
            }

            if (debtor.value === 0) {
                debtors.splice(0, 1);
                debtor = null;
            }
            if (lender.value === 0) {
                lenders.splice(0, 1);
                lender = null;
            }

            delta = 0;
        }

        return {
            values: values,
            totalValue: totalValue,
            equalPayment: equalPayment
        };
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
    }
});