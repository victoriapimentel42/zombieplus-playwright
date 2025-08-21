
import { test, expect } from '../support';
import { faker } from '@faker-js/faker';


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

    //enviando um lead pela api
   const newLead = await request.post('http://localhost:3000/leads', {
        data: {
            name: leadName,
            email: leadEmail
        }
    })
    
    //confirmando o envio com sucesso do lead
    expect(newLead.ok()).toBeTruthy()

    //await page.waitForSelector('.toast', { state: 'hidden', timeout: 5000 });
    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm(leadName, leadEmail)

    const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
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

test('Não deve cadastrar quando todos os campos estão vazios', async ({ page }) => {


    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('', '')

    await page.alert.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])


})