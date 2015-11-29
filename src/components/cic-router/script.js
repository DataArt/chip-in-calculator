Polymer({

    is: "cic-router",

    properties: {
        name: {
            type: String,
            value: 'Name',
            notify: true
        },
        routerPath: {
            type: String,
            value: '/CIC/bower_components/page/page.js'
        },
        initialized: {
            type: Boolean,
            value: false,
            notify: true
        },
        currentPage: {
            type: String,
            value: '/home',
            notify: true
        }
    },

    ready: function(){
        this.init(function(){
            this.rules();
            page({hashbang: true});
        }.bind(this));
    },

    init: function(callback){
        this.$.utils.loadScript(
            this.routerPath,
            callback
        );
    },

    rules: function () {

        var currentPageChange = function(page){
            return function(data) {
                if (!data) data = {};
                this.currentPage = page;
                var result = {
                    page: this.currentPage,
                    params: data.params
                };
                this.fire('page-changed', result);
            }.bind(this);
        }.bind(this);

        page('/home', currentPageChange('home'));
        page('/result/:pointer', currentPageChange('result'));

        page('*', function() {
            page.redirect('/home');
        });

    },

    redirect: function (p, param) {
        var url = "/" + p;
        if (param) url += "/" + param;
        page.redirect( url );
    }

});