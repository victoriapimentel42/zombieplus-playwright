
import {expect } from '@playwright/test';

export class Leads{

    constructor(page){
        this.page = page;
    }

    async visit(){
        await this.page.goto('/')
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

            // const content = await page.content();
            // console.log(content);
    }

    async goPageLeads(){
        await this.page.locator('a[href$="leads"]').click()
        const subtitle = await this.page.getByRole('heading', {level: 1, name: 'Gestão de leads'})
        await expect(subtitle).toBeVisible()
    }

    async search(target){
        await this.page.getByPlaceholder('Busque pelo email').fill(target)
        await this.page.locator('.actions button').click()
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async remove(email){
        await this.page.getByRole('row', { name: email }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }


}