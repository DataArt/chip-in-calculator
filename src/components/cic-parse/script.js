
Polymer({

    is: "cic-parse",

    properties: {
        appId: {
            type: String,
            value: '4l7rfgTXjfA9Fn52jJWRagIvBjvrUQiACq1DmlGD'
        },
        jsId: {
            type: String,
            value: '4JzH31AT3RJdQSIxnnHWYHO1rh7O4vHN7Jjq5CIB'
        }
    },

    ready: function(){
        Parse.serverURL = 'https://parseapi.back4app.com/';
        Parse.initialize(this.appId, this.jsId);
    },

    save: function(data, callback){
        var DataRawParse = Parse.Object.extend("data_raw");
        var dataRawParse = new DataRawParse();
        dataRawParse.save({data: data})
            .then(function(e){
                var pointer = e.id;
                this.fire('saved', pointer);
                if (callback) callback(pointer)
            }.bind(this));
    },

    load: function(pointer, callback){

        function success(parseObj){
            if (callback) callback(parseObj.get('data'))
        }

        var DataRawParse = Parse.Object.extend("data_raw");
        var query = new Parse.Query(DataRawParse);
        query.get(pointer)
            .then(success)

    }
});
