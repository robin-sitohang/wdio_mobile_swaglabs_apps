import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens the app and waits for it to be ready
    */
    public async open () {
        console.log('Opening application...');
        try {
            // Get current activity
            const currentPackage = await browser.getCurrentPackage();
            const currentActivity = await browser.getCurrentActivity();
            console.log(`Current package: ${currentPackage}`);
            console.log(`Current activity: ${currentActivity}`);

            // Wait for app to be ready
            await browser.pause(2000);
            
            // Check if app is installed
            const isAppInstalled = await browser.isAppInstalled('id.kompas.turvis');
            console.log('Is app installed?', isAppInstalled);
            
        } catch (error) {
            console.error('Error in open method:', error);
            throw error;
        }
    }
}
