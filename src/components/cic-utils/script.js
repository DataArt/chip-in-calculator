Polymer({

    is: "cic-utils",

    clone: function (obj) {
        var copy = null,
            _this = this;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = _this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = _this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },

    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    // http://stackoverflow.com/questions/7718935
    loadScript: function(src, callback) {
        var s, r, t;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.onload = s.onreadystatechange = function() {
            if ( !r && (!this.readyState || this.readyState == 'complete') )
            {
                r = true;
                callback();
            }
        };
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    },

    isDefined: function(value){
        return typeof value !== 'undefined';
    },

    calculate: function(contributors) {

        var contributors = contributors.filter(function(item){
            return this.isDefined(item.value);
        }.bind(this));

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
    }
});