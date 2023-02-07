import LoginPage from '../pageobjects/login.page.js';
import * as assert from "assert";

let statusCode;

  
describe('Amzon.in', () => {

    it('should load url succesfully', async () => {
        await LoginPage.open();
        await browser.setupInterceptor();
        expect(await $('#nav-logo-sprites').isDisplayed()).toBe(true);
    });
    it('should be able to capture api while searching for an item', async()=>{
        await $(`#twotabsearchtextbox`).setValue("Iphone");
        await browser.pause(3000);
        let results = await browser.getRequest('GET','https://completion.amazon.in/api/2017/suggestions?')
        console.log(results[1]); 
         statusCode = (results[1].response.statusCode);
         console.log(statusCode);
         await browser.expectRequest('GET', 'https://completion.amazon.in/api/2017/suggestions?', 200);
         await assert.equal(results[1].response.statusCode, 200);
         await assert.equal(results[1].method, 'GET');
         
        });
});


