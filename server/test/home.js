// NODE MODULES
var webdriverio = require('webdriverio');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

// TESTING FRAMEWORK
var testing = require('./testing.js');

describe('Homepage Tester', function(){
    var me = this,
        client = {};

    before(function(done){
            testing.init(function(){ //init loads file and env config and needs to run first

                me.timeout(testing.config.global_timeout);  //default test timeouts

                var capabilities = testing.getCapabilties(),
                    url = testing.config.protocol + testing.config.url,
                    options = { desiredCapabilities: {browserName: capabilities} };

                client = webdriverio.remote(options);

                //setup custom commands
                client.addCommand('getExtObjId',testing.getExtObjId.bind(client));
                client.addCommand('clickExt',testing.getExtObjId.bind(client));
                // client.addCommand('login',testing.login.bind(client));

                client
                .init()
                .setViewportSize({
                    width: testing.config.win_width,
                    height: testing.config.win_height
                })
                .url(url)
                //.login(url) //external helper function
                .call(done);

        });
    });

    it('should show homepage',function(done) {
        client
            .click('*[id="home"]')
            .pause(8000)
            .getTitle(function(err, title) {
                assert(!err);
                assert(title === 'Administration');
            })
            .call(done);
    });

    after(function(done) {
       client.end(done);
    });
});