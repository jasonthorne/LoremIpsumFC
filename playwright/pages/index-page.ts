import {expect, Page} from '@playwright/test'
import BasePage from './base-page';

export class IndexPage extends BasePage{

    constructor(readonly page: Page){
        super(page);
    }

    //assert 'news & updates' content is visible:
    async assertNewsUpdatesContentIsVisible(selector: string, heading: string, text: string){
        await expect(this.page.locator(selector)
            .filter({hasText: heading})
            .filter({hasText: text})
        ).toBeVisible();
    }

    //assert fixture result content is visible:
    async assertFixtureResultContentIsVisible(
        selector: string, 
        homeTeamLogo: string, homeTeamName: string, homeTeamScore: string, 
        awayTeamLogo: string, awayTeamName: string, awayTeamScore: string){
            await expect(this.page.locator(selector)
                .filter({has: this.page.getByRole('img',{name: homeTeamLogo})})
                .filter({hasText: homeTeamName})
                .filter({hasText: homeTeamScore})
                .filter({has: this.page.getByRole('img',{name: awayTeamLogo})})
                .filter({hasText: awayTeamName})
                .filter({hasText: awayTeamScore})
            ).toBeVisible();
    }

    //assert admin content is visible:
    async assertAdminContentIsVisible(
        selector: string, title: string, image: string, name: string, text: string){
            await expect(this.page.locator(selector)
                .filter({hasText: title})
                .filter({has: this.page.getByRole('img',{name: image})})
                .filter({hasText: name})
                .filter({hasText: text})
            ).toBeVisible();
    }

    //assert input field:
    async assertInputField(selector: string, placeholder: string, maxlength: string){
        await expect(this.page.locator(selector)).toHaveAttribute('placeholder', placeholder);
        await expect(this.page.locator(selector)).toHaveAttribute('maxlength', maxlength);
    }

    //aseert coment form is visible:
    async assertCommentFormIsVisible(
        selector: string, handlePlaceholder: string, commentPlaceholder: string, postBtn: string){
            await expect(this.page.locator(selector)
                .filter({has: this.page.getByPlaceholder(handlePlaceholder)})
                .filter({has: this.page.getByPlaceholder(commentPlaceholder)})
                .filter({has: this.page.getByRole('button',{name: postBtn})})
            ).toBeVisible();
    }

    //assert comment modal is visible:
    async assertCommentModalIsVisible(
        selector: string, header: string, handle: string, 
        comment: string, submitBtn: string, cancelBtn: string){
            await expect(this.page.locator(selector)
                .filter({hasText: header})
                .filter({hasText: handle})
                .filter({hasText: comment})
                .filter({has: this.page.getByRole('button',{name: submitBtn})})
                .filter({has: this.page.getByRole('button',{name: cancelBtn})})
            ).toBeVisible();
    }

    //assert comment is visible:
    async assertCommentIsVisible(
        selector: string, likes: string, handle: string, 
        comment: string, date: number, likeBtn: string, deleteBtn: string){
            await expect(this.page.locator(selector)
                .filter({hasText: await this.page.locator(likes).innerText()}) //MIGHT BE A PROBLEM WITH MULTIPLE COMMENTS :P
                .filter({hasText: handle})
                .filter({hasText: comment})
                .filter({hasText: new Date(date).toLocaleString('en-GB').slice(0,-3)})
                .filter({has: this.page.getByRole('button',{name: likeBtn})})
                .filter({has: this.page.getByRole('button',{name: deleteBtn})})
            ).toBeVisible();
    }

    //assert like button clicks:
    async assertLikeBtnClicks(selector: string, unlikedClass: string, likedClass: string){
       /* await expect(this.page.locator('.fas')).toBeVisible();
        await this.page.getByRole('button', {name: btnText}).click();
        console.log("+++++++++" + selector);
        await expect(this.page.locator('.far')).toBeVisible();*/


        //await expect(this.page.locator('.comment-like-btn').locator('.far')).toBeVisible();
        await expect(this.page.locator(selector).locator(unlikedClass)).toBeVisible();
        //await this.page.getByRole('button', {name: btnText}).click();
        await this.page.locator(selector).locator(unlikedClass).click();
        await expect(this.page.locator(selector).locator(likedClass)).toBeVisible();
        await this.page.locator(selector).locator(likedClass).click();
        await expect(this.page.locator(selector).locator(unlikedClass)).toBeVisible();


        /*
         //assert image src:
        async assertImgSrc(selector: string, alt: string, src: string){
        expect(await this.page.locator(selector).getByRole('img',{name: alt})
            .getAttribute('src')).toMatch(src);
        }*/

       /* expect(this.page.locator('.comment-like-btn')
            .filter({ has: this.page.ge.getByRole('i', { name: 'Like' }) }))*/

        /*const btnClass = await this.page.locator(selector).evaluate((element: HTMLElement)=>{
            return window.getComputedStyle(element).getPropertyValue('background-image');
        });
        expect(imgSrc).toContain(src);*/

        

    }


    async assertDeleteCommentModalIsVisible(){

    }

   
}

export default IndexPage;