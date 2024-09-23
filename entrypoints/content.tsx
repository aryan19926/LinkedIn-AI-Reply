export default defineContentScript({
  matches: ['https://*/*', 'http://*/*'],
  main() {

    // Insert the response into the input field
    const handleClick = () => {
      const paragraph = document.querySelector('.msg-form__contenteditable p');
      const placeholderdiv = document.querySelector('.msg-form__placeholder');
      if (paragraph) {
        placeholderdiv!.setAttribute('data-placeholder', '');
        paragraph.textContent = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
      } else {
        console.log("Wrong page");
      }
    }

    const addIconOnFocus = async() => {
      const inputField = document.querySelector('.msg-form__contenteditable') as HTMLElement;
      if (inputField) {
        const icon = document.createElement('img') as HTMLImageElement;
        icon.src = '../assets/icon.png'; // Replace with the path to your image
        icon.style.position = 'absolute';
        icon.style.right = '10px';
        icon.style.top = '50%';
        icon.style.transform = 'translateY(-50%)';
        icon.style.display = 'none';
        inputField.style.position = 'relative';
        inputField.appendChild(icon);

        inputField.addEventListener('focus', () => {
          icon.style.display = 'inline';
        });

        inputField.addEventListener('blur', () => {
          icon.style.display = 'none';
        });

        icon.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleModal();
        });
      }
    }
    
    // Create or toggle the modal for user input
    const toggleModal = () => {
      let modalDiv = document.querySelector('.modal-container') as HTMLElement;
      
      if (modalDiv) {
        modalDiv.remove();
        return;
      }

      modalDiv = document.createElement('div');
      modalDiv.classList.add('modal-container');
      modalDiv.innerHTML = `
        <div class="modal-content" style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          width: 300px;
        ">
          <div class="p-4 w-[300px] mx-auto">
            <div class="mb-4" id="response-container"></div>
            <div class="mb-4">
              <input
                type="text"
                id="user-prompt"
                placeholder="Reply thanking for the opportunity"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div class="flex justify-between">
              <button
                id="insert-button"
                class="bg-white text-gray-700 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
              >
                ↓ Insert
              </button>
              <button
                id="generate-button"
                class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
              >
                ⟳ Generate
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalDiv);

      const staticResponse = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

      const responseContainer = document.getElementById('response-container');
      const userPromptInput = document.getElementById('user-prompt') as HTMLInputElement;
      const insertButton = document.getElementById('insert-button');
      const generateButton = document.getElementById('generate-button');

      generateButton!.addEventListener('click', (e) => {
        e.stopPropagation();
        responseContainer!.innerHTML = `
          <div class="bg-blue-50 border border-blue-200 rounded p-3">
            <p class="text-gray-700">${staticResponse}</p>
          </div>
        `;
      });

      insertButton!.addEventListener('click', (e) => {
        e.stopPropagation();
        handleClick();
        toggleModal();
      });

      // Prevent the modal from closing when clicking inside it
      modalDiv.querySelector('.modal-content')!.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    }

    // Add event listener to close modal when clicking outside
    document.addEventListener('click', (event) => {
      const modalContainer = document.querySelector('.modal-container');
      if (modalContainer && !modalContainer.contains(event.target as Node)) {
        modalContainer.remove();
      }
    });

    const intervalId = setInterval(() => {
      const inputField = document.querySelector('.msg-form__contenteditable') as HTMLElement;
      if (inputField){
        addIconOnFocus();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
    
  },
});