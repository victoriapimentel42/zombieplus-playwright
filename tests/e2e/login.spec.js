
import { test,expect } from '../support';
import { faker } from '@faker-js/faker';


test('Deve logar como administrador', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
})

test('Não deve logar com senha incorreta', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('admin@zombieplus.com', 'pwd1234')
    
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.haveText(message)


})

test('Não deve logar com email não registrado', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('admin@zombie.com', 'pwd123')
    
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.haveText(message)


})

test('Não deve logar com email vazio', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('', 'pwd123')
    await page.login.alertHaveText('Campo obrigatório')
})

test('Não deve logar com senha vazia', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('admin@zombie.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('Não deve logar com senha e email vazios', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})

test('Não deve logar com email invalido', async ({page}) => {

    await page.login.visit()
    await page.login.submitForm('www.teste.br', 'pwd123')
    await page.login.alertHaveText('Email incorreto')
})