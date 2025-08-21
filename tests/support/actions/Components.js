import { expect } from '@playwright/test';

export class Popup{

    constructor(page){
        this.page = page
    }

    async haveText(message) {
        
        const element = this.page.locator('.swal2-html-container')
        
        await expect(element).toHaveText(message)
    }

    
}

export class Alert{

    constructor(page){
        this.page = page
    }

    async alertHaveText(text){
       await expect(this.page.locator('.alert')).toHaveText(text)
    }

}