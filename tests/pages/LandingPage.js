
import {expect } from '@playwright/test';

export class LandingPage{

    constructor(page){
        this.page = page;
    }

    async visit(){
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal(){
        await this.page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click();
        // é possivel pesquisar como um like % %
        // await page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');
    }

    async submitLeadForm(name,email){
        await this.page.locator('#name').fill(name);
        await this.page.locator('#email').fill(email);

        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click();

         /*await page.getByText('seus dados conosco').click();
            const content = await page.content();
            console.log(content);*/  //gambiarra para conseguir ter acesso ao codigo do toast
    }



    async alertHaveText(target){
          await expect(this.page.locator('.alert')).toHaveText(target);
    }
}