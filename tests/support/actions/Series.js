import { expect } from "@playwright/test";

export class Series{

    constructor(page){
        this.page = page
    }

    async goForm(){
        await this.goPageSeries()
        await this.page.locator('a[href$="register"]').click()
    }

    async submitForm(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async goPageSeries(){
        await this.page.locator('a[href$="tvshows"]').click()
        const subtitle = await this.page.getByRole('heading', { level: 1, name: 'Séries de TV' })
        await expect(subtitle).toBeVisible()
    }

    async create(serie){
        await this.goForm()

        await this.page.getByLabel('Titulo da série').fill(serie.title)
        await this.page.getByLabel('Sinopse').fill(serie.overview)

        await this.page.locator('#select_company_id').click()
        await this.page.locator('.react-select__option').filter({ hasText: serie.company }).click()

        await this.page.locator('#select_year').click()
        await this.page.locator('.react-select__option').filter({ hasText: serie.release_year }).click()

        await this.page.getByLabel('Temporadas').fill(serie.seasons)

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + serie.cover)

        if(serie.featured){
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submitForm()

    }

    async remove(title){
        await this.page.getByRole('row', {name: title}).getByRole('button').click()
        await this.page.locator('.confirm-removal').click()
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.locator('.actions button').click()
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }
}