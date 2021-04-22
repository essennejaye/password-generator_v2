const generateBtn = document.getElementById('generate');
const passwordLength = document.getElementById('password-length');
const password = document.getElementById('password');
const checkedCharacters = document.querySelectorAll('input[type ="checkbox"]');
const passwordCharacters = ['uppercase', 'lowercase', 'numbers', 'specials'];
const clearBtn = document.getElementById('clearBtn');

generateBtn.addEventListener('click', () => {
    const passLength = parseInt(getPasswordLength());
    if (passLength) {
        const passCharac = getPasswordCharacters();
        password.textContent = generatePassword(passLength, passCharac);
        if (password.textContent) {
            clearBtn.classList.remove('disabled');
        }
    }
});
clearBtn.addEventListener('click', () => {
    clearDisplay()
});

const getPasswordLength = () => {
    // const passwordLength = document.getElementById('password-length').value;
    if (isNaN(passwordLength.value) ||
        !passwordLength.value ||
        passwordLength.value < 8 ||
        passwordLength.value > 128) {
        displayModal(`<h1>Oops!</h1><h3>password length must be a number <br > between 8 and 128.</h3>
                      <br ><br ><br ><p>click on the <i class="fas fa-times"></i> to close</p>
        `);
        clearDisplay();
        return false;
    }
    return passwordLength.value;
}

const getPasswordCharacters = () => {
    let selectedCharacters = [];
    checkedCharacters.forEach((character) => {
        if (character.checked) {
            characterIndex = passwordCharacters.indexOf(character.value);
            selectedCharacters.push(characterIndex);
        }
    })
    if (selectedCharacters.length === 0) {
        displayModal(`<h1>Oops!</h1><h3>You must choose <br > at least 1 character type.</h3>
                      <br ><br ><br ><br ><p>click on the <i class="fas fa-times"></i> to close</p>
        `);
        clearDisplay();
        return false;
    }
    console.log(selectedCharacters);
    return selectedCharacters;
}

const generatePassword = (pwdLength, pwdCharac) => {
    let newPassword = '';
    for (let i = 0; i < pwdLength; i++) {
        let randomNumber = Math.floor(Math.random() * pwdCharac.length);
        switch (pwdCharac[randomNumber]) {
            case 0:
                newPassword += String.fromCharCode(Math.floor((Math.random() * 26) + 65));
                break;
            case 1:
                newPassword += String.fromCharCode(Math.floor((Math.random() * 26) + 97));
                break;
            case 2:
                newPassword += (Math.floor(Math.random() * 10)).toString();
                break;
            case 3:
                newPassword += String.fromCharCode(Math.floor((Math.random() * 15) + 33));
        }
    }
    return newPassword;
}

const clearDisplay = () => {
    password.textContent = '';
    passwordLength.value = '';
    checkedCharacters.forEach((input) => {
        input.checked = true;
        clearBtn.classList.add('disabled');
    });
}
// select modal-btn,modal-overlay,close-btn
// listen for click events on modal-btn and close-btn
// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay
const displayModal = (content) => {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const modelContent = document.querySelector('.modal-container h3');
    modelContent.innerHTML = content;
    modalOverlay.classList.add('open-modal');
    closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('open-modal');
    })
}
