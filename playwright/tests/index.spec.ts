import {test} from '@playwright/test';
import {IndexPage} from '../pages/index-page';
import {indexPageData} from '../data/index-page-data';

let indexPage: IndexPage;

test.beforeEach(async({page})=>{
    try{
        await page.goto(indexPageData.url);
        indexPage = new IndexPage(page);
    }catch(error){
        console.error(`An error occurred: ${error.message}`);
    }
});

test.describe('Testing Page Title', {tag:'@title'},()=>{
    test('Assert page title', async()=>{
        await indexPage.assertPageTitle(indexPageData.title);
    });
});

test.describe('Testing Navbar', {tag:'@navbar'},()=>{
    const navbarData = indexPageData.navbar;
    
    test('Assert navbar logo', async()=>{
        //assert logo image is visible:
        await indexPage.assertImgIsVisible(
            navbarData.logo.id, navbarData.logo.img.alt
        );
        //assert logo image src:
        await indexPage.assertImgSrc(
            navbarData.logo.id,
            navbarData.logo.img.alt,
            indexPageData.navbar.logo.img.src
        );
        //assert logo text is visible:
        await indexPage.assertTextIsVisible(
            navbarData.logo.id, navbarData.logo.span.text
        );
    });
   
    test('Assert navbar links', async()=>{
        //assert each nav link's url:
        for(const navLink of navbarData.nav.links){
            await indexPage.assertNavbarLink(
                navbarData.nav.class, navLink.text, navLink.href
            );
        }
    });

    test('Assert navbar logo text visability', async()=>{
        //assert logo text is visible:
        await indexPage.assertTextIsVisible(
            navbarData.logo.id, navbarData.logo.span.text
        );
        //assert text is hidden on given viewport width:
        await indexPage.assertTextIsHiddenOnViewportWidth(
            navbarData.logo.id, navbarData.logo.span.text, 
            navbarData.logo.span.hidden_width
        );
    });
});

test.describe('Testing Hero', {tag:'@hero'},()=>{

    test('Assert hero element', async()=>{
        const heroData = indexPageData.hero;

        //assert hero is visible:
        await indexPage.assertElementIsVisible(heroData.id);
        //assert hero background-image:
        await indexPage.assertBackgroundImg(heroData.id, heroData.img.src);
        //assert hero title text:
        await indexPage.assertTextIsVisible(
            heroData.title.id, heroData.title.text
        );
    });
});

test.describe('Testing News & Updates Section', {tag:'@news-updates'},()=>{
    const sectionData = indexPageData.section.news_updates;

    test('Assert news and updates section', async()=>{
        //assert section is visible:
        await indexPage.assertElementIsVisible(sectionData.id);
        //assert section header is visible:
        await indexPage.assertTextIsVisible(
            sectionData.header.class, sectionData.header.text
        );
    });

    test('Assert news and updates content', async()=>{
        //assert all section body content is visible:
        for(const content of sectionData.body.content){
            await indexPage.assertNewsUpdatesContentIsVisible(
                sectionData.body.class, content.heading, content.text
            );
        }
    });
});

test.describe('Testing Fixtures & Results Section', {tag:'@fixtures-results'},()=>{
    const sectionData = indexPageData.section.fixtures;

    test('Assert fixtures and results section', async()=>{
        //assert section is visible:
        await indexPage.assertElementIsVisible(sectionData.id);
        //assert section header is visible:
        await indexPage.assertTextIsVisible(
            sectionData.header.class, sectionData.header.text
        );
        //assert section body text is visible:
        await indexPage.assertTextIsVisible(
            sectionData.body.class, sectionData.body.text
        );
    });

    test('Assert fixtures and results content', async()=>{
        //asserts a team's img src:
        const assertTeamImgSrc = async(team:{logo:{src:string; alt:string;}})=>{
            await indexPage.assertImgSrc(
                sectionData.body.results.class, team.logo.alt, team.logo.src
            );
        };
        //spin throgh fixture results:
        for(const result of sectionData.body.results.content){
            //assert team's img sources:
            assertTeamImgSrc(result.home_team.team);
            assertTeamImgSrc(result.away_team.team);

            //assert that content for each fixture is visible:
            await indexPage.assertFixtureResultContentIsVisible(
                sectionData.body.results.class,
                {
                    logo: result.home_team.team.logo.alt,
                    name: result.home_team.team.name,
                    score: result.home_team.score
                },
                {
                    logo: result.away_team.team.logo.alt,
                    name: result.away_team.team.name,
                    score: result.away_team.score
                }
            );
        }
    });
});

test.describe('Testing Admin Section', {tag:'@admin'},()=>{
    const sectionData = indexPageData.section.admin;

    test('Assert admin section', async()=>{
        //assert section is visible:
        await indexPage.assertElementIsVisible(sectionData.id);
        //assert section header is visible:
        await indexPage.assertTextIsVisible(
            sectionData.header.class, sectionData.header.text
        );
        //assert section body text is visible:
        await indexPage.assertTextIsVisible(
            sectionData.body.class, sectionData.body.text
        );
    });

    test('Assert admin staff content', async()=>{
        const staff = sectionData.body.staff;

        //spin through each staff member:
        for(const member of Object.keys(staff).map(key=>staff[key])){
            //assert member's image src:
            await indexPage.assertImgSrc(
                sectionData.body.class, member.img.alt, member.img.src
            );
            //assert that member's content is visible:
            await indexPage.assertAdminContentIsVisible(
                sectionData.body.class, 
                {
                    title: member.title, img: member.img.alt, 
                    name: member.name, text: member.text
                } 
            );
        }
    });
});

test.describe('Testing Comments Section', {tag:'@comments'},()=>{
    const sectionData = indexPageData.section.comments;
    const commentFormData = sectionData.body.form;
    const commentData = indexPageData.comment;
   
    test('Assert comments section', async()=>{
        //assert section is visible:
        await indexPage.assertElementIsVisible(sectionData.id);
        //assert section header is visible:
        await indexPage.assertTextIsVisible(
            sectionData.header.class, sectionData.header.text
        );
        //assert handle input field:
        await indexPage.assertInputField(
            commentFormData.handle_input.id, 
            commentFormData.handle_input.placeholder, 
            commentFormData.handle_input.maxlength
        );
        //assert comment input field:
        await indexPage.assertInputField(
            commentFormData.comment_input.id, 
            commentFormData.comment_input.placeholder, 
            commentFormData.comment_input.maxlength
        );
        //assert comment form is visible:
        await indexPage.assertCommentFormIsVisible(
            sectionData.body.class,
            {
                handle: commentFormData.handle_input.placeholder, 
                comment: commentFormData.comment_input.placeholder,
                button: commentFormData.button.text
            }
        );
    });

    test('Assert comment creation and deletion', async()=>{
        const createCommentModalData = indexPageData.modal.create_comment;
        const deleteCommentModalData = indexPageData.modal.delete_comment;
        const dateNow: string = new Date(
            Math.floor(Date.now())).toLocaleString('en-GB').slice(0,-3);
        
        //enter valid handle:
        await indexPage.enterInputFieldText(
            commentFormData.handle_input.id, commentData.content.handle
        );
        //enter valid comment:
        await indexPage.enterInputFieldText(
            commentFormData.comment_input.id, commentData.content.comment
        );
        //click 'post comment' button:
        await indexPage.clickButton(
            sectionData.body.class, commentFormData.button.text
        );
        //assert confirmation modal is visible:
        await indexPage.assertCommentModalIsVisible(
            {
                id: createCommentModalData.id, 
                header: createCommentModalData.header.text, 
                submitBtn: createCommentModalData.footer.submit_button.text, 
                cancelBtn: createCommentModalData.footer.cancel_button.text
            },
            {
                handle: commentData.content.handle, 
                comment: commentData.content.comment
            }
        );
        //click 'submit' button:
        await indexPage.clickButton(
            createCommentModalData.footer.class,
            createCommentModalData.footer.submit_button.text
        );
        //assert confirmation modal is gone:
        await indexPage.assertElementIsHidden(
            createCommentModalData.id
        );
        //confirm created comment is visible:
        await indexPage.assertCommentIsVisible(
            {
                class: commentData.class, 
                likesClass: commentData.title.likes.class, 
                handle: commentData.content.handle, 
                comment: commentData.content.comment,
                date: dateNow,
                likeBtn: commentData.like_button.text, 
                deleteBtn: commentData.delete_button.text
            }
        );
        //assert like button clicks:
        await indexPage.assertLikeBtnClicks(
            {
                class: commentData.class,
                date: dateNow,
                likesClass: commentData.title.likes.class,
                likeBtnClass: commentData.like_button.class, 
                unlikedClass: commentData.like_button.icon.unliked.class, 
                likedClass: commentData.like_button.icon.liked.class, 
            }
        );
    
        //click 'delete' button:
        await indexPage.clickButton(
            commentData.class, commentData.delete_button.text
        );
        //assert confirmation modal is visible:
        await indexPage.assertDeleteCommentModalIsVisible(
            {
                id: deleteCommentModalData.id,
                header: deleteCommentModalData.header.text,
                text: deleteCommentModalData.body.text,
                deleteBtn: deleteCommentModalData.footer.delete_button.text,
                cancelBtn: deleteCommentModalData.footer.cancel_button.text
            }
        );
        //click 'delete' button:
        await indexPage.clickButton(
            deleteCommentModalData.footer.class,
            deleteCommentModalData.footer.delete_button.text
        );
        //assert confirmation modal is gone:
        await indexPage.assertElementIsHidden(
            deleteCommentModalData.id
        );
        //assert created comment is gone:
        await indexPage.assertCommentIsHidden(
            {
                class: commentData.class, 
                handle: commentData.content.handle, 
                comment: commentData.content.comment,
                date: dateNow,
                likeBtn: commentData.like_button.text, 
                deleteBtn: commentData.delete_button.text 
            }
        );
    });

    test('Assert tooltip on comment creation with no handle', async()=>{
        //enter valid comment:
        await indexPage.enterInputFieldText(
            commentFormData.comment_input.id, 
            commentData.content.comment
        );
        //click 'post comment' button:
        await indexPage.clickButton(
            sectionData.body.class, commentFormData.button.text
        );
        //assert tooltip for handle input:
        await indexPage.assertTooltipIsVisible(
            commentFormData.handle_input.tooltip.text
        );
    });

    test('Assert tooltip on comment creation with no comment', async()=>{
        //enter valid handle:
        await indexPage.enterInputFieldText(
            commentFormData.handle_input.id, 
            commentData.content.handle
        );
        //click 'post comment' button:
        await indexPage.clickButton(
            sectionData.body.class, commentFormData.button.text
        );
        //assert tooltip for comment input:
        await indexPage.assertTooltipIsVisible(
            commentFormData.comment_input.tooltip.text
        );
    });

    test('Assert tooltips on comment creation with no handle & no comment', async()=>{
        //click 'post comment' button:
        await indexPage.clickButton(
            sectionData.body.class, commentFormData.button.text
        );
        //assert tooltip for handle input:
        await indexPage.assertTooltipIsVisible(
            commentFormData.handle_input.tooltip.text
        );
        //assert tooltip for comment input:
        await indexPage.assertTooltipIsVisible(
            commentFormData.comment_input.tooltip.text
        );
    });
});

test.describe('Testing Footer', {tag:'@footer'},()=>{
    const footerData = indexPageData.footer;
    test.setTimeout(120000); //increase due to new tabs

    test('Assert creator attribute', async()=>{
        const creatorData = footerData.creator;

        //assert creator text is visible:
        await indexPage.assertTextIsVisible(
            footerData.selector, creatorData.text
        );
        //spin through creator links:
        for(const [i, link] of creatorData.links.entries()){
            //assert icon is visible:
            await indexPage.assertElementIsVisible(link.icon.class);
            //assert link url works:
            await indexPage.assertFooterCreatorLink(
                creatorData.id, i, link.href
            )
        }
    });

    test('Assert pitch image attribute', async()=>{
        const pitchData = footerData.pitch;

        //assert text is visible:
        await indexPage.assertTextIsVisible(
            footerData.selector, pitchData.text
        );
        //assert source url works:
        await indexPage.assertFooterAttributeLink(
            pitchData.link.text, pitchData.link.href
        );
        //assert host url works:
        await indexPage.assertFooterAttributeLink(
            pitchData.host.link.text, pitchData.host.link.href
        );
    });

    test('Assert team & staff icons attribute', async()=>{
        const teamStaffData = footerData.team_and_staff;
        
        //assert text is visible:
        await indexPage.assertTextIsVisible(
            footerData.selector, teamStaffData.text
        );
        //assert source url works:
        await indexPage.assertFooterAttributeLink(
            teamStaffData.link.text, teamStaffData.link.href
        );
        //assert host url works:
        await indexPage.assertFooterAttributeLink(
            teamStaffData.host.link.text, 
            teamStaffData.host.link.href
        );
    });
    
    test('Assert footer & comment icons attribute', async()=>{
        const footerCommentData = footerData.footer_and_comment;

        //assert text is visible:
        await indexPage.assertTextIsVisible(
            footerData.selector, footerCommentData.text
        );
        //assert source url works:
        await indexPage.assertFooterAttributeLink(
            footerCommentData.link.text, 
            footerCommentData.link.href
        );
    });
});