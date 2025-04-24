import * as dotenv from 'dotenv';
import { config as envConfig } from './config/env';
import * as fs from 'fs';
import { ITestCaseHookParameter } from '@cucumber/cucumber';

dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    
    specs: [
        process.env.SPEC ? `./test/feature/${process.env.SPEC}.feature` : './test/feature/**/*.feature'
    ],
    exclude: [],
    
    maxInstances: 10,
    
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': envConfig.appium.automationName,
        'appium:udid': envConfig.device.udid,
        'appium:platformVersion': envConfig.device.platformVersion,
        'appium:app': envConfig.app.path,
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': true,
        'appium:autoGrantPermissions': true,
        'appium:appPackage': envConfig.app.package,
        'appium:appActivity': envConfig.app.activity,
    }],

    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: [
        ['appium', {
            logPath: './',
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true
            }
        }]
    ],
    
    framework: 'cucumber',
    
    reporters: [
        'spec',
        ['cucumberjs-json', {
            jsonFolder: './reports/json/',
            language: 'en',
        }]
    ],

    cucumberOpts: {
        require: ['./test/stepdefinitions/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
    },

    onPrepare: function () {
        const dirs = ['./reports', './reports/json', './reports/html', './reports/screenshots'];
        
        // Clean up existing reports
        if (fs.existsSync('./reports')) {
            fs.rmSync('./reports', { recursive: true, force: true });
        }
        
        // Create fresh directories
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    },

    beforeSession: function () {
        console.log('Tag Expression:', process.env.TAG);
    },

    beforeScenario: async function (_world: ITestCaseHookParameter) {
        await driver.executeScript('mobile: clearApp', [{
            appId: process.env.APP_PACKAGE as string
        }]);
        await driver.activateApp(process.env.APP_PACKAGE as string);
    },

    afterStep: async function (_step, _scenario, result) {
        if (result.error) {
            const timestamp = new Date().getTime();
            await driver.saveScreenshot(
                `./reports/screenshots/screenshot-${timestamp}.png`
            );
        }
    },

    afterScenario: async function (_world, _result) {
        await driver.terminateApp(process.env.APP_PACKAGE as string, {});
    },

    onComplete: async function() {
        // @ts-ignore
        const reporter = (await import('multiple-cucumber-html-reporter')).default;
        reporter.generate({
            jsonDir: './reports/json/',
            reportPath: './reports/html/',
            metadata: {
                browser: {
                    name: 'chrome',
                    version: '60'
                },
                device: process.env.DEVICE_NAME || 'Local test machine',
                platform: {
                    name: 'Android',
                    version: process.env.PLATFORM_VERSION || '11.0'
                }
            },
            customData: {
                title: 'Run info',
                data: [
                    {label: 'Project', value: 'Mobile Testing Project'},
                    {label: 'Release', value: '1.0.0'},
                    {label: 'Execution Start Time', value: new Date().toISOString()}
                ]
            }
        });
    }
}