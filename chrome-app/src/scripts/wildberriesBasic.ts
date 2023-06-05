import { TemplateItem } from "../types";

interface Config {
  confirmation: boolean;
  autofill: boolean;
  paginate: boolean;
  onlyTop: boolean;
  personalizes?: boolean;
}
export const runWildberriesBasic = (
  config?: Config,
  template?: TemplateItem[]
) => {
  const mainFeedbackClass = ".FeedbacksCardsView__list";
  const allFeedbacksOnPage = document.querySelector(mainFeedbackClass);
  const feedbacksList = allFeedbacksOnPage?.querySelectorAll(
    mainFeedbackClass + "-item"
  );
  feedbacksList?.forEach((feedback) => {
    const productNameElement = feedback.querySelector(
      '[class*="ProductInfo__name__"]'
    );
    const productName = productNameElement
      ? productNameElement.textContent?.split(" ")
      : [""];

    const feedbackContentElement = feedback.querySelector(
      '[class*="ProductInfo__content__"]'
    );
    const feedbackContent = feedbackContentElement
      ? feedbackContentElement.textContent
      : "";
    const codeWB = feedback.querySelector('[class*="Articles-info__"]')
      ? findArticleWB(
          feedback.querySelector('[class*="Articles-info__"]') as HTMLElement
        )
      : "";

    const ratingLiElements = feedback.querySelectorAll("li");
    let ratingCount = 0;
    ratingLiElements.forEach((liElement) => {
      const mainStar = liElement.querySelector("span");
      if (mainStar) {
        const filedStar = mainStar.querySelector("span");
        if (filedStar) {
          if (filedStar.offsetWidth > 0) {
            ratingCount++;
          }
        }
      }
    });

    const buttonToOpen = feedback
      .querySelector('[class*="Toggle-open-button__"]')
      ?.querySelector("button");
    if (buttonToOpen) {
      buttonToOpen.click();
    }
    const textareaFiled = feedback.querySelector("textarea");
    // if (ratingCount === 5 && productName?.includes())
    feedback.classList.add("done");
  });
  console.log(template);
  console.log("DONE");
};

/*
Disctionary:
  Send button:
    opacity: .4; || disabled - inactive (textarea not filled)
    opacity: unset - ready to send
    class: Button-link--success* - success
*/

function sendResponse(feedback: HTMLElement) {}

function findArticleWB(element: HTMLElement): string | null {
  const regex = /\d{9}/;
  const matches = element.innerHTML.match(regex);
  return matches ? matches[0] : null;
}

function transformRating(input: string) {
  const result = [];

  if (input.endsWith("+")) {
    const number = parseInt(input.slice(0, -1));
    for (let i = number; i <= 5; i++) {
      result.push(i);
    }
  } else if (input.endsWith("-")) {
    const number = parseInt(input.slice(0, -1));
    for (let i = 1; i <= number; i++) {
      result.push(i);
    }
  } else {
    const number = parseInt(input);
    result.push(number);
  }

  return result;
}
