import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {
    private get inputUsername() {
        return $('~test-Username');
    }

    private get inputPassword() {
        return $('~test-Password');
    }

    private get btnLogin() {
        return $('~test-LOGIN');
    }

    private get errorMessage() {
        return $('//android.widget.TextView[@text="Sorry, this user has been locked out."]');
    }

    private get invalidPassword() {
        return $('//android.widget.TextView[@text="Username and password do not match any user in this service."]');
    }

    private get menuButton() {
        return $('~test-Menu');
    }

    private get cartButton() {
        return $('//android.view.ViewGroup[@content-desc="test-Cart"]');
    }

    async enterUsername(username: string) {
        await this.inputUsername.setValue(username);
    }

    async enterPassword(password: string) {
        await this.inputPassword.setValue(password);
    }

    async tapLoginButton() {
        await this.btnLogin.click();
    }

    async verifyErrorMessage(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async verifyInvalidPassword(message: string) {
        await expect(this.invalidPassword).toHaveText(message);
    }

    async verifyHomePageElements() {
        await expect(this.menuButton).toBeDisplayed();
        await expect(this.cartButton).toBeDisplayed();
    }
}

export default new LoginPage();
