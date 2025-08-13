//import { test, expect } from '@playwright/test';
import { test,expect } from '../support';
const data = require('../support/fixtures/movies.json')
import { executeSQL } from '../support/database';


test('Deve cadastrar um filme com sucesso', async ({ page }) => {

    //importante estar logado

    const movie = data.create

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)
    
    await page.login.visit()
    await page.login.submitForm('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie)

    await page.toast.haveText('Uhull Cadastro realizado com sucesso!')
})