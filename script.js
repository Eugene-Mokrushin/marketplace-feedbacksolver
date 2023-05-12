
// Find all elements with class FeedbacksCardsView__list-item
alert('Start')


setTimeout(() => {
  const feedbackItems = document.querySelectorAll('.FeedbacksCardsView__list-item');
  alert('Loop started')
  // Loop through each feedback item
  feedbackItems.forEach((feedbackItem, index) => {
    const delay = Math.floor(Math.random() * 201) + 2000; // generate a random delay between 200 and 400 ms
    setTimeout(() => {
      // Find the element with data-name="Rating"
      const ratingElement = feedbackItem.querySelector('[data-name="Rating"]');

      // Find all the li elements inside the rating element
      const ratingLiElements = ratingElement.querySelectorAll('li');

      // Initialize the rating count to 0
      let ratingCount = 0;

      // Loop through each li element
      ratingLiElements.forEach((liElement) => {
        // Find the span element inside the li element
        const spanElement = liElement.querySelector('span');
        const spanElement2 = spanElement.querySelector('span');
        // Check if the span element has a width greater than 0px
        if (spanElement2.offsetWidth > 0) {
          // Increase the rating count by 1
          ratingCount++;
        }
      });
      if (ratingCount === 5) {
        const titleElement = feedbackItem.querySelector('.MobileCardHeader__title');
        const lastSpanElement = titleElement.querySelector('span:last-child');
        const title = lastSpanElement.textContent.trim();
        const titleWords = title.split(' ').map(word => word.toLowerCase());
        const textareaElement = feedbackItem.querySelector('textarea');
        if (titleWords.includes('richard')) {
          textareaElement.innerHTML = "Добрый день. Благодарим за выбор нашей продукции. Мы подготовили для вас подборку товара бренда Richard: 126964019,126964028,126964014. Приятного Вам чаепития!";
        } else if (titleWords.includes('coffesso')) {
          textareaElement.innerHTML = "Добрый день. Благодарим за выбор нашей продукции. Мы подготовили для вас подборку товара бренда Coffesso: 126964036,126964022,126963997.";
        } else if (titleWords.includes('майский')) {
          textareaElement.innerHTML = "Добрый день. Благодарим за выбор нашей продукции. Мы подготовили для вас подборку товара бренда Майский:  126964011,126964031. Приятного Вам чаепития!";
        } else if (titleWords.includes('curtis')) {
          textareaElement.innerHTML = "Добрый день. Благодарим за выбор нашей продукции. Мы подготовили для вас подборку товара бренда Curtis: 126992992, 126964023,126964010. Приятного Вам чаепития!";
        } else if (titleWords.includes('лисма')) {
          textareaElement.innerHTML = "Добрый день. Благодарим за выбор нашей продукции. Мы подготовили для вас подборку товара бренда Лисма: 23683230, 35515191. Приятного Вам чаепития!";
        }
        textareaElement.focus();
        const inputEvent = new Event("input", { bubbles: true });
        textareaElement.dispatchEvent(inputEvent);

        // Create and dispatch a "change" event
        const changeEvent = new Event("change", { bubbles: true });
        textareaElement.dispatchEvent(changeEvent);
        const openItem = feedbackItem.querySelector('.Toggle-open-button__text')
        openItem.scrollIntoView()
        const clickEventOpen = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        openItem.dispatchEvent(clickEventOpen)
        const replySpanElements = feedbackItem.querySelectorAll('span');
        replySpanElements.forEach((replySpanElement) => {
          if (replySpanElement.textContent.trim() === 'Ответить') {
            // Get the parent element of the "Ответить" span element
            const parentElement = replySpanElement.parentElement;
            feedbackItem.scrollIntoView();
            // Check if the parent element is a button
            if (parentElement.tagName.toLowerCase() === 'button') {
              // Remove the "disabled" property from the button
              const clickEventBtn = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              parentElement.disabled = false;
              setTimeout(() => parentElement.dispatchEvent(clickEventBtn), 1000)
            }
          }
        });
      }
    }, index * delay + 1000);
  });
}, 7000)