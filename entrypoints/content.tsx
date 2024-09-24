import Vector from '../assets/Vector.png'
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
        icon.src = Vector; // Replace with the path to your image
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
        ">
          <div style="padding: 16px; width: 300px; margin-left: auto; margin-right: auto;">
            <div style="margin-bottom: 16px;" id="response-container"></div>
            <div style="margin-bottom: 16px;">
              <input
                type="text"
                id="user-prompt"
                placeholder="Reply thanking for the opportunity"
                style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;"
              />
            </div>
            <div style="display: flex; justify-content: space-between;">
              <button
                id="insert-button"
                style="background-color: white; color: #374151; border: 1px solid #d1d5db; border-radius: 4px; padding: 8px 16px; cursor: pointer;"
                onmouseover="this.style.backgroundColor='#f3f4f6';"
                onmouseout="this.style.backgroundColor='white';"
              >
                ↓ Insert
              </button>
              <button
                id="generate-button"
                style="background-color: #3b82f6; color: white; border-radius: 4px; padding: 8px 16px; cursor: pointer;"
                onmouseover="this.style.backgroundColor='#2563eb';"
                onmouseout="this.style.backgroundColor='#3b82f6';"
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
          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 12px;">
            <p style="color: #374151;">${staticResponse}</p>
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