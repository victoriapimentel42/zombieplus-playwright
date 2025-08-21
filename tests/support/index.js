const {test: base,expect} = require('@playwright/test')

import { Login } from './actions/Login';
import { Popup } from './actions/Components';
import { Movies } from './actions/Movies';
import { Leads } from './actions/Leads';
import { Api } from './api';
import { Series } from'./actions/Series';
import { Alert } from './actions/Components';


const test = base.extend({
    page: async({page}, use) => {

        const context = page

        context['leads']= new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['popup'] = new Popup(page)
        context['series'] = new Series(page)
        context['alert'] = new Alert(page)
        

        await use(context)
    },

    request: async ({request}, use) => {
        
        const context = request

        context['api'] = new Api(request)
        await context['api'].setToken()

        await use(context)
    }

})

export {test,expect}