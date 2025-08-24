import { test, expect } from '../support';
const data = require('../support/fixtures/series.json')
import { executeSQL } from '../support/database';

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.tvshows `)
})

test('Deve cadastrar uma serie com sucesso', async({page}) => {

    const serie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.series.create(serie)

    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)
})

test('Não deve cadastrar com titulo duplicado', async({page, request}) => {
    
    const serie = data.duplicate

    await request.api.postSerie(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.create(serie)

    await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async({page}) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.goForm()
    await page.series.submitForm()

    await page.alert.alertHaveText(['Campo obrigatório','Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório (apenas números)'])


})

test('Deve poder remover uma serie', async({page, request}) => {

    const serie = data.to_remove
    await request.api.postSerie(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.series.goPageSeries()
    await page.series.remove(serie.title)
    await page.popup.haveText('Série removida com sucesso.')
})

test('Deve realizar busca pelo termo Walking', async({page, request}) => {
    const series = data.search

    series.data.forEach(async (serie) => {
        await request.api.postSerie(serie)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.goPageSeries()

    await page.series.search(series.input)
    await page.series.tableHave(series.outputs)
})

test('Deve realizar busca por titulo não cadastrado', async ({page, request}) => {

    const serie = data.unregistered_search
    await request.api.postSerie(serie.data)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.goPageSeries()

    await page.series.search(serie.input)
    await expect(page.locator('span')).toHaveText('Nenhum registro encontrado!')

})