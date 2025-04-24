// import type { Browser } from 'webdriverio';
// declare const browser: Browser;

export async function scrollScreen(
    x1: number = 100,
    y1: number = 1200,
    x2: number = 100,
    y2: number = 300
  ) {
    await browser.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: x1, y: y1 },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 500 },
        { type: 'pointerMove', duration: 1000, x: x2, y: y2 },
        { type: 'pointerUp', button: 0 }
      ]
    }]);
    await browser.releaseActions();
  }

  
  // Scroll to element by text
  export async function scrollToElementByText(text: string) {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`;
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    return el;
  }

  // Scroll to element by resource id
  export async function scrollToElementByResourceId(resourceId: string) {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId("${resourceId}"))`;
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: 10000 });
    return el;
   }

