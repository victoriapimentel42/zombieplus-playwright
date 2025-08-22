//import { test, expect } from '@playwright/test';
import { test, expect } from '../support';
const data = require('../support/fixtures/movies.json')
import { executeSQL } from '../support/database';


test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.movies `)
})


test('Deve cadastrar um filme com sucesso', async ({ page }) => {

    //importante estar logado
    const movie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)

    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)

})

test('Deve poder remover um filme', async ({page,request}) => {

    const movie = data.to_remove
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.remove(movie.title)

    await page.popup.haveText('Filme removido com sucesso.')

})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.movies.submit()

    await page.alert.alertHaveText(['Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório', 'Campo obrigatório'])


})

test('Não deve cadastrar com titulo duplicado', async ({ page, request }) => {

    const movie = data.duplicate
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    

    await page.movies.create(movie)
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('Deve realizar busca pelo termo zumbi', async ({page, request}) => {

    const movies = data.search

    movies.data.forEach(async (movie) => {
        await request.api.postMovie(movie)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    
    await page.movies.search(movies.input)
    await page.movies.tableHave(movies.outputs)
})

test('Deve realizar busca por titulo não cadastrado', async({page,request}) => {

    const movies = data.unregistered_search

    movies.data.forEach(async(movie) => {
        await request.api.postMovie(movie)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.search(movies.input)
    await expect(page.locator('span')).toHaveText('Nenhum registro encontrado!');


})