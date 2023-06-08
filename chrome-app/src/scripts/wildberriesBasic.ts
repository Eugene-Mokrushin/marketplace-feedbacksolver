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
  if (!feedbacksList) return;
  const feedbackListArr = Array.from(feedbacksList).reverse();
  feedbackListArr.forEach(async (feedback) => {
    feedback.scrollIntoView({ block: "center" });
    await delay();
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
      await delay();
    }
    const textarea = feedback.querySelector("textarea");
    const foundByArticle = codeWB ? groupByArticle[codeWB] : null;
    let general = null;
    let match = null;
    if (foundByArticle) {
      foundByArticle.forEach((template_item) => {
        const isTriggered = checkForBlackList(
          template_item.triggers,
          feedbackContent
        );
        if (template_item.rating) {
          const ratingTransformed = transformRating(
            template_item.rating
          ).includes(ratingCount);
          if (ratingTransformed) {
            if (isTriggered) {
              match = template_item.blacklistResponse;
            } else if (template_item.response) {
              const randomIndex = Math.floor(
                Math.random() * template_item.response.length
              );
              const selectedResponse = template_item.response[randomIndex];
              match = handleRecommendations(
                selectedResponse,
                template_item.recommendation
              );
            } else {
              if (template_item.response) {
                const randomIndex = Math.floor(
                  Math.random() * (template_item.response as []).length
                );
                match = template_item.response[randomIndex];
              } else {
                match = null;
              }
            }
          } else {
            match = null;
          }
        } else {
          if (template_item.recommendation) {
            if (isTriggered) {
              general = template_item.blacklistResponse;
            } else if (template_item.recommendation) {
              const randomIndex = Math.floor(
                Math.random() * template_item.recommendation.length
              );
              const selectedRecommendation =
                template_item.recommendation[randomIndex];
              general = handleRecommendations(
                selectedRecommendation,
                template_item.recommendation
              );
            } else {
              general = template_item.response;
            }
          } else {
            general = null;
          }
        }
      });
    }
    const foundByBrand = getTemplateByBrand(groupByBrand, productName);
    if (!match && !general && foundByBrand) {
      foundByBrand.forEach((template_item) => {
        const isTriggered = checkForBlackList(
          template_item.triggers,
          feedbackContent
        );
        if (template_item.rating) {
          const ratingTransformed = transformRating(
            template_item.rating
          ).includes(ratingCount);
          if (ratingTransformed) {
            if (isTriggered) {
              match = template_item.blacklistResponse;
            } else if (template_item.response) {
              const randomIndex = Math.floor(
                Math.random() * template_item.response.length
              );
              const selectedResponse = template_item.response[randomIndex];
              match = handleRecommendations(
                selectedResponse,
                template_item.recommendation
              );
            } else {
              if (template_item.response) {
                const randomIndex = Math.floor(
                  Math.random() * (template_item.response as []).length
                );
                match = template_item.response[randomIndex];
              } else {
                match = null;
              }
            }
          } else {
            match = null;
          }
        } else {
          if (template_item.recommendation) {
            if (isTriggered) {
              general = template_item.blacklistResponse;
            } else if (template_item.recommendation) {
              const randomIndex = Math.floor(
                Math.random() * template_item.recommendation.length
              );
              const selectedRecommendation =
                template_item.recommendation[randomIndex];
              general = handleRecommendations(
                selectedRecommendation,
                template_item.recommendation
              );
            } else {
              general = template_item.response;
            }
          } else {
            general = null;
          }
        }
      });
    }
    const sendButton = feedback.querySelector(
      '[class*="Feedbacks-answer-form__text-area"]'
    )?.nextElementSibling as HTMLButtonElement;
    if (textarea && sendButton) {
      if (match) {
        await sendResponse(textarea, sendButton, match);
        return;
      } else if (general) {
        await sendResponse(textarea, sendButton, general);
        return;
      } else {
        await delay();
        console.log("Unable to respond");
      }
    }
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
const AWAIT_TIME = 1000;
async function sendResponse(
  textarea: HTMLTextAreaElement,
  sentButton: HTMLButtonElement,
  response: string
): Promise<boolean> {
  const buttonOpacity = window
    .getComputedStyle(sentButton)
    .getPropertyValue("opacity");
  if (sentButton.querySelector("div")) {
    await delay();
    const res = await sendResponse(textarea, sentButton, response);
    if (res) return true;
  } else if (buttonOpacity === "0.4") {
    textarea.focus();
    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);
    console.log(textarea);
    textarea.value = response;
    const changeEvent = new Event("change", { bubbles: true });
    textarea.dispatchEvent(changeEvent);
    sentButton.disabled = false;
    const clickEventBtn = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    sentButton.dispatchEvent(clickEventBtn);
    await delay();
    const res = await sendResponse(textarea, sentButton, response);
    if (res) return true;
  } else if (buttonCheckSuccess(sentButton)) {
    return true;
  }
  return false;
}
function delay(ms: number = AWAIT_TIME) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findArticleWB(element: HTMLElement): string | null {
  const regex = /\d{9}/;
  const matches = RegExp(regex).exec(element.innerHTML);
  return matches ? matches[0] : null;
}

function buttonCheckSuccess(element: HTMLElement): boolean {
  const classNames = Array.from(element.classList);
  for (const className of classNames) {
    if (className.startsWith("Button-link--success__")) {
      return true;
    }
  }
  return false;
}

function handleRecommendations(
  feedback: string,
  recomendations: undefined | string[]
) {
  if (!recomendations) {
    return feedback;
  }
  const patternRegex = /r{(\d+)}/;
  const match = RegExp(patternRegex).exec(feedback);
  if (!match) {
    return feedback;
  }
  const patternNumber = Number(match[1]);
  const availableStrings = recomendations.slice();
  const selectedStrings = [];

  for (let i = 0; i < patternNumber; i++) {
    if (availableStrings.length === 0) {
      break;
    }
    const randomIndex = Math.floor(Math.random() * availableStrings.length);
    const selectedString = availableStrings.splice(randomIndex, 1)[0];
    selectedStrings.push(selectedString);
  }
  const replacedString = selectedStrings.join(", ");

  return feedback.replace(patternRegex, replacedString);
}

function transformRating(input: string) {
  const result: number[] = [];
  if (typeof +input.slice(0, -1) !== "number") return result;
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

function checkForBlackList(
  triggers: string[] = [],
  response: string | null = ""
): boolean {
  if (!response) return false;
  const notIndexSet = new Set<number>();
  const secondList = response.split(" ");
  for (let i = 0; i < secondList.length; i++) {
    if (secondList[i] === "не") {
      notIndexSet.add(i);
    }
  }
  for (let word of triggers) {
    if (secondList.includes(word)) {
      const wordIndex = secondList.indexOf(word);
      if (!notIndexSet.has(wordIndex - 1)) {
        return true;
      }
    }
  }

  return false;
}

function groupByProperties(items: TemplateItem[]): {
  groupByBrand: BrandsImage;
  groupByArticle: ArticlesImage;
} {
  const groupByBrand: BrandsImage = {};
  const groupByArticle: ArticlesImage = {};

  for (const item of items) {
    const brand = item.brand ? item.brand.toLowerCase() : null;
    const article = transformArticle(item.articleWB);

    createGroupIfMissing(groupByBrand, brand);
    createGroupIfMissing(groupByArticle, article);

    if (brand) groupByBrand[brand].push(item);
    if (article) groupByArticle[article].push(item);
  }

  return { groupByBrand, groupByArticle };
}

function transformArticle(
  articleWB: string | number | null | undefined
): string | null {
  if (articleWB === null || articleWB === undefined) {
    return null;
  }

  if (typeof articleWB === "number") {
    return articleWB.toString().toLowerCase();
  }

  return articleWB.toLowerCase();
}

function createGroupIfMissing(group: any, key: string | null): void {
  if (key && !(key in group)) {
    group[key] = [];
  }
}

function getTemplateByBrand(obj: BrandsImage, words: string[]) {
  for (const word of words) {
    if (word in obj) {
      return obj[word];
    }
  }

  return null;
}
