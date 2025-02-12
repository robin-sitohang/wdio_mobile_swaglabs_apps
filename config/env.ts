import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    device: {
        udid: process.env.UDID || 'emulator-5554',
        platformVersion: process.env.PLATFORM_VERSION || '11.0',
        deviceName: process.env.DEVICE_NAME || 'Pixel_3a'
    },
    app: {
        path: process.env.APP_PATH || '/Users/robinvalentinositohang/Downloads/Kompasid_Turvis.apk',
        package: process.env.APP_PACKAGE || 'id.kompas.turvis',
        activity: process.env.APP_ACTIVITY || '.MainActivity'
    },
    appium: {
        automationName: process.env.AUTOMATION_NAME || 'UiAutomator2',
        noReset: process.env.NO_RESET === 'true',
        fullReset: process.env.FULL_RESET === 'true'
    }
};