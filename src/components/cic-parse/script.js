
Polymer({
    is: "cic-parse",
    properties: {
        appId: {
            type: String,
            value: 'OAliOF0kM1OcWQGr0VNvn33X3tgpjDxubZnRZT0W'
        },
        jsId: {
            type: String,
            value: 'qZLeXvmqhwO58xYl05XWpChNA0gZtqyfyqf5Rnn8'
        },
        parsePath: {
            type: String,
            value: '/CIC/bower_components/parse/parse.min.js'
        },
        initialized: {
            type: Boolean,
            value: false,
            notify: true
        }
    },
    ready: function(){
        this.init()
    },
    init: function(callback){
        this.$.utils.loadScript(
            this.parsePath,
            function(){
                Parse.initialize(this.appId, this.jsId);
                this.initialized = true;
                if (callback) callback();
            }.bind(this)
        );
    },
    save: function(data){
        var _save = function(d){
            var DataRawParse = Parse.Object.extend("data_raw");
            var dataRawParse = new DataRawParse();
            dataRawParse.save({data: d})
                .then(function(e){
                    var pointer = e.id;
                    this.fire('saved', pointer);
                }.bind(this));
        }.bind(this);

        if (!this.initialized)
            this.init(_save(data));
        else
            _save(data)
    },
    load: function(pointer){

    }
});