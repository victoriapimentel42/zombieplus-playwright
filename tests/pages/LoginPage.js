import { expect } from '@playwright/test';

export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')
        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submitForm(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        await this.page.getByRole('button', { name: 'Entrar' }).click()
    }

   

    async alertHaveText(text){
        const alert = this.page.locator('span[class$=alert]')
        
        await expect(alert).toHaveText(text)
    }

    
    
}