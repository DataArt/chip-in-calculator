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
        }
    },

    ready: function(){
        this.currentPage = '';
    },

    init: function(){
        this.rules();
        page({hashbang: true});
    },

    rules: function () {

        var currentPageChange = function(page){
            return function(data) {
                if (!data) data = {};
                this.currentPage = page;
                this.currentParams = data.params;
                var result = {
                    page: this.currentPage,
                    params: data.params
                };
                this.fire('page-changed', result);
                window.scrollTo(0, 0);
            }.bind(this);
        }.bind(this);

        page('/home', currentPageChange('home'));
        page('/r/:pointer', currentPageChange('r'));

        page('*', function() {
            page.redirect('/home');
        });

    },

    redirect: function (p, param) {
        var url = "/" + p;
        if (param) url += "/" + param;
        page.redirect( url );
    },

    getLocation: function(){
        var link = '';

        link = document.location.href;

        return link
    }

});