export default defineContentScript({
  matches: ['https://*/*', 'http://*/*'],
  main() {
    console.log('Hello content.');

    function handleClick() {
      const paragraph = document.querySelector('.msg-form__contenteditable p');
      const placeholderdiv = document.querySelector('.msg-form__placeholder');
      if (paragraph) {
        placeholderdiv!.setAttribute('data-placeholder', '');
        paragraph.textContent = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
      } else {
        console.log("Wrong page");
      }
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "insertMessage") {
        handleClick();
      }
    });
  },
});