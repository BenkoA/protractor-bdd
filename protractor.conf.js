exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    allScriptsTimeout: 100000,
    getPageTimeout: 100000,

    framework: 'custom',
    frameworkPath: require.resolve('./node_modules/protractor-cucumber-framework/'),

    specs: [
        'features/*.feature'
    ],

    baseURL: 'http://localhost:8080/',

    cucumberOpts: {
        require: 'stepDefinitions/**/*.js',
        tags: false,
        format: 'pretty',
        profile: false,
        'no-source': true,
        keepAlive: false
    },

    capabilities: {
        name : 'ChromeIphone',
        logName : 'Chrome Iphone',
        browserName: 'chrome',
        chromeOptions: {
            'args': ['user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4']
        },
        mobileEmulationEnabled: true
    },

    onPrepare: function(){
        var windowWidth = 500;
        var windowHeight = 900;
        browser.ignoreSynchronization=true;
        browser.driver.manage().window().setSize(windowWidth, windowHeight);
        browser.manage().timeouts().implicitlyWait(10000);
    }

};