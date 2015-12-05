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
    }
});