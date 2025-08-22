
import { test, expect } from '../support';
import { faker } from '@faker-js/faker';
import { executeSQL } from '../support/database';

test.beforeAll(async() =>{
    await executeSQL(`DELETE FROM public.leads`)
})


test('Deve cadastrar um lead na fila de espera', async ({ page }) => {

    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadEmail)

    const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
    await page.popup.haveText(message)


});

test('Não deve cadastrar quando o email ja existe', async ({ page, request }) => {

    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

    await request.api.postLead(leadName, leadEmail)

    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadEmail)

    const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
    await page.popup.haveText(message)


});
test('Não deve cadastrar com email incorreto', async ({ page }) => {

    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('victoria', 'victoria')
    await page.alert.alertHaveText('Email incorreto')
})

test('Não deve cadastrar com campo nome vazio', async ({ page }) => {


    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('', 'victoria@gmail.com')
    await page.alert.alertHaveText('Campo obrigatório')

})

test('Não deve cadastrar com campo email vazio', async ({ page }) => {


    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('victoria', '')
    await page.alert.alertHaveText('Campo obrigatório')

})

test('Não deve cadastrar quando todos os campos estão vazios', async ({ page,request }) => {


    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('', '')

    await page.alert.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])


})

test('Deve realizar busca de lead', async({page, request}) => {

    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

    await request.api.postLead(leadName, leadEmail)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.leads.goPageLeads()

    await page.leads.search(leadEmail)
    await page.leads.tableHave(leadEmail)


 })

 test('Deve excluir um lead', async({page, request}) => {

    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

    await request.api.postLead(leadName, leadEmail)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.leads.goPageLeads()

    await page.leads.remove(leadEmail)
    await page.popup.haveText('Lead removido com sucesso.')


 })