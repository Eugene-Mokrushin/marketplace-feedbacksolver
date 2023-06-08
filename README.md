# FeedbackSolver

## What is this?
I figured out that there is a common problem with replying to customers' feedback among sellers in the Russian E-commerce market.
The lack of diversity in replies damages the brand image as if some sort of a robot is behind the screen, as well as the manual work required to reply to 1000+ feedbacks per week and mistakes that will arise from such an approach.
All this inspired me to create a Chrome extension to solve this issue and make some $ from this side hustle. After all, if there is a robot behind the screen, wouldn't it be better to be the best robot of them all, would it?

So, why the chrome extension? When I was starting this project there were no open APIs for replying to feedback. The only way I saw to solve this issue is to manipulate DOM directly - hence extension.

## The problem
When the basic part (replying via Excel template) was finished I saw that Wildberries (the main marketplace I was aiming for) updated its APIs and now the company CAN reply via API to feedback. \
**...** Well, that's for this extension I suppose. To make the FeedbackSolver site in the usual way then.

## In case someone wants to give it a try

[Figma file](https://www.figma.com/file/gSFsQXwqKTCpP8miY0UdgZ/WB-feedback-extention?type=design&node-id=0-1&t=e4Z7gSJf2wgJQUXI-0) - you can find unfinished design here

**Build:**
* `npm install` for each folder in root (except ***extension***)
* setup firebase for Auth, Realtime DB, Functions & Storage
* in ***firebase*** folder via sdk connect to your firebase and then `cd functions` & `npm run deploy`
* in ***chrome-app*** folder run `npm run build` - webpack will build content.js file in ***extension*** folder
* go to ***chrome://extensions/*** in your Chrome browser and load extension locally from ***extension*** folder
* start backend to handle excel files - `cd backend` & `npm run devStart` 

<div style={display: 'flex'}>
<img alt="Chrome" src="https://img.shields.io/badge/Google%20Chrome-4285F4.svg?style=for-the-badge&logo=Google-Chrome&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
<img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
<img alt="Webpack" src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=for-the-badge&logo=Webpack&logoColor=black" />
<img alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
<img alt="Firebase" src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" />
<img alt="SASS" src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" />
</div>
