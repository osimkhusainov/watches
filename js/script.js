window.addEventListener('DOMContentLoaded', () => {
   
   
    //Tabs
    const tabParent = document.querySelector('.tab__link'),
        tabs = tabParent.querySelectorAll('.tab__links'),
        products = document.querySelectorAll('.product');

    function hideTabContent() {
        products.forEach(item => {
            item.classList.add('hide');
        });
        tabs.forEach(item => {
            item.classList.remove('tab__links-active');
        });
    }
    function showTabsContent(i = 0) {
        products[i].classList.remove('hide');
        tabs[i].classList.add('tab__links-active');
    }
    hideTabContent();
    showTabsContent();
    
    tabParent.addEventListener('click', (event) => {
    let target = event.target;
        if(target && target.classList.contains('tab__links')){
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabsContent(i);
                }
            });
        }
    });

    // Add buttons
    let productParent = document.querySelectorAll('.products');

    for (let i = 0; i < productParent.length; i++) {
        let button = document.createElement('button');
        button.classList.add('products__btn');
        productParent[i].appendChild(button);
        button.textContent = 'BUY';
    }
    
    
    //Modal
    let modal = document.querySelector('.modal'),
        openModal = document.querySelectorAll('.products__btn'),
        body = document.querySelector('.body'),
        closeModal = modal.querySelector('.window__close');

    openModal.forEach((item) => {
        item.addEventListener('click', () => {
            openModalDialog();
            clearInterval(timerId); // удаляем таймер если пользователь уже кликнул по кнопке 
        });
    });
   let timerId = setTimeout(openModalDialog, 5000); // создаем таймер появления модального окна
    function openModalDialog() {
        modal.classList.remove('hide');
        body.style.overflow = 'hidden';
    }
    function closeModalDialog() {
        modal.classList.add('hide');
        body.style.overflow = '';
    }
    closeModal.addEventListener('click', closeModalDialog);
    window.addEventListener('keydown', (e) => {
        if(e.code == 'Escape') {
            closeModalDialog();

            massiveClear();
        }
    });
    modal.addEventListener('click', (event) => {
        let target = event.target;
        if(target == modal) {
            closeModalDialog();
            massiveClear();
        }
    });
    function clearInputs(input, mess) {
        const formControl = input.parentElement,
              small = formControl.querySelector('small');
 
        small.textContent = '';
        formControl.className = 'form__control';
    }
    function massiveClear() {
        for (let i = 0; i < inputElement.length; i++ ) {
            clearInputs(inputElement[i]);
            inputElement[i].value = '';
        }
    }

    const input = document.querySelectorAll('input');

    //Error message
    let form = document.getElementById('form'),
          name = document.getElementById('name'),
          email = document.getElementById('email'),
          message = document.getElementById('message'),
          inputElement = [name, email, message];

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            checkInputs();

        });
        function checkInputs() {
            const nameValue = name.value.trim(),
                  emailValue = email.value.trim(),
                  messageValue = message.value.trim();

            if(nameValue === ''){
                setErrorFor(name, 'Please fill in your name');
            }else {
                setSuccessFor(name);
            }
            if(emailValue == '' || !isEmail(emailValue)) {
                setErrorFor(email, 'Please fill correct in your email');
            }else {
                setSuccessFor(email);
            }
            if(messageValue === '') {
                setErrorFor(message, 'Please write your message');
            } else {
                setSuccessFor(message);
            }
        }
        function setErrorFor(input, message) {
            const formControl = input.parentElement,
                  small = formControl.querySelector('small');

            small.textContent = message;
            formControl.className = 'form__control error';
        }
        function setSuccessFor(input){
            const formControl = input.parentElement;
            formControl.className = 'form__control success';
        }
        function isEmail(email) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }



    const modalThanks = document.querySelector('.close'), 
          btnSend = modal.querySelector('.window__btn'),
          modalClose = modalThanks.querySelector('.window__close');


          function openModalThanks () {
                closeModalDialog();
                modalThanks.classList.remove('hide');
                body.style.overflow = 'hidden';
                massiveClear();
                setTimeout(modalCloseFunc, 2000);

        }
        btnSend.addEventListener('click', () => {
            let nameValue = name.value.trim(),
                emailValue = email.value.trim(),
                messageValue = message.value.trim();
            if(nameValue != '' && emailValue != '' && messageValue != ''){
                setTimeout(openModalThanks, 1000);
            }   
        });
        
        function modalCloseFunc() {
            modalThanks.classList.add('hide');
            body.style.overflow = '';
        }
        modalClose.addEventListener('click', modalCloseFunc);
        
        window.addEventListener('click', (e) => {
            const target = e.target;
            if (target == modalThanks) {
                modalCloseFunc();
            }
        });
});
