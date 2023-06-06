import { TemplateItem, WbRunBasicConfig as Config } from "../types";

interface BrandsImage {
  [key: string]: TemplateItem[];
}
interface ArticlesImage {
  [key: string]: TemplateItem[];
}

export const runWildberriesBasic = (
  template: TemplateItem[],
  config?: Config
) => {
  const { groupByBrand, groupByArticle } = groupByProperties(template);

  const mainFeedbackClass = ".FeedbacksCardsView__list";
  const allFeedbacksOnPage = document.querySelector(mainFeedbackClass);
  const feedbacksList = allFeedbacksOnPage?.querySelectorAll(
    mainFeedbackClass + "-item"
  );
  feedbacksList?.forEach((feedback) => {
    feedback.scrollIntoView({ block: "center" });
    const productNameElement = feedback.querySelector(
      '[class*="ProductInfo__name__"]'
    );

    const productName: string[] = productNameElement?.textContent
      ? productNameElement.textContent.split(" ").map((w) => w.toLowerCase())
      : [];

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
    const foundByArticle = codeWB ? groupByArticle[codeWB] : null;
    const foundByBrand = getTemplateByBrand(groupByBrand, productName);
    feedback.classList.add("done");
  });

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

function groupByProperties(items: TemplateItem[]): {
  groupByBrand: BrandsImage;
  groupByArticle: ArticlesImage;
} {
  const groupByBrand: BrandsImage = {};
  const groupByArticle: ArticlesImage = {};

  for (const item of items) {
    if (item.brand && !groupByBrand[item.brand]) {
      groupByBrand[item.brand.toLocaleLowerCase()] = [];
    }

    if (item.articleWB && !groupByArticle[item.articleWB]) {
      groupByArticle[item.articleWB.toLocaleLowerCase()] = [];
    }

    if (item.brand) groupByBrand[item.brand].push(item);
    if (item.articleWB) groupByArticle[item.articleWB].push(item);
  }

  return { groupByBrand, groupByArticle };
}

function getTemplateByBrand(obj: BrandsImage, words: string[]) {
  for (const word of words) {
    if (word in obj) {
      return obj[word];
    }
  }

  return null;
}
