const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector);  //formElement is the id newsletterForm

    function successMessage(input){
        const newsletterContainer = document.querySelector('.newsletterContainer')
        const successMessage = document.querySelector('.successMessageContainer')
        const userEmail = document.querySelector('.userEmail')

        userEmail.textContent = input.value
      
        newsletterContainer.classList.add('hidden')
        successMessage.classList.add('active')
    }
    
    const validationOptions = [
        {
            attribute: 'required',
            isValid: input => input.value.trim() !== '', //if input box is not empty = true or false
            errorMessage: (label) => `${label.textContent} is required`
        } ,
        {
            attribute: 'pattern',
            isValid: input => {
                const patternRegex = new RegExp(input.pattern)
                return patternRegex.test(input.value) },
            errorMessage: (label) => {
                return `Not a valid email address`
            }
        }
    ]

    const validate = form => {
        const label = form.querySelector('label')
        const input = form.querySelector('input')
        const errorContainer = form.querySelector('.errorMessage')
        
      
        errorContainer.textContent = '';
        let formError = false;

       for(const option of validationOptions){
            if(input.hasAttribute(option.attribute) && !option.isValid(input)){
                errorContainer.textContent = option.errorMessage(label);
                
                input.classList.add('error')
                input.classList.remove('defaultColor')
                formError = true;
                break;
            }            
        }
        if(!formError){
            successMessage(input)
            input.classList.remove('error')
            input.classList.add('defaultColor')
        }
        
    }


    formElement.setAttribute('novalidate', '');

    formElement.addEventListener('submit', e =>{
        e.preventDefault();
        validate(formElement)

    });
};
validateForm('#newsletterForm')