import { $ } from '@wdio/globals'
import Page from './page';

class ProductPage extends Page {
    private get cartBadge() {
        return $('//android.view.ViewGroup[@content-desc="test-Cart"]//android.widget.TextView');
    }

    private getProductByName(name: string) {
        return $(`//android.widget.TextView[@text="${name}"]/../../..//android.view.ViewGroup[@content-desc="test-ADD TO CART"]`);
    }

    async addProductToCart(productName: string) {
        const addToCartButton = this.getProductByName(productName);
        await addToCartButton.click();
    }

    async verifyCartBadgeCount(count: string) {
        const badge = this.cartBadge;
        await expect(badge).toHaveText(count);
    }
}

export default new ProductPage();