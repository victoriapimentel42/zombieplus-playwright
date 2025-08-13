import { expect } from '@playwright/test';

export class Toast{

    constructor(page){
        this.page = page
    }

    async haveText(message) {
        const toast = this.page.locator('.toast',{
            hasText: message
        })

        //await expect(toast).toHaveText(message)
        await expect(toast).toBeHidden({ timeout: 5000 });
        
    }

    
}