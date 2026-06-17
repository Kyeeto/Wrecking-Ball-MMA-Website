AOS.init({
    once: true
})

const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger.addEventListener('click', function(){
    mobileNav.classList.toggle('open');
});


const classHeader = document.getElementById('class-header');
if (classHeader){
    const observer = new IntersectionObserver(function(entries){
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                classHeader.classList.add('animate');
            }
        });
    });
    observer.observe(classHeader);
}



const form = document.querySelector('form');
if (form){
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        const fields = [
            {id: 'first-name', error: 'first-name-error', message: 'First name is required'}, 
            {id: 'last-name', error: 'last-name-error', message: 'Last name is required'},
            {id: 'email', error: 'email-error', message: 'Email is required'},
            {id: 'phone', error: 'phone-error', message: 'Phone number is required'},
            {id: 'message', error: 'message-error', message: 'Message is required'}
        ];

        fields.forEach(function(field){
            const input = document.getElementById(field.id);
            const error = document.getElementById(field.error);
            if (!input.value.trim()) {
                error.textContent = field.message;
                error.classList.add('visible');
                input.classList.add('invalid');
                valid = false;
            } else{
                error.classList.remove('visible');
                input.classList.remove('invalid');
            }
        });

        if (valid){
            console.log('Form is valid, ready to submit');
        }

        if (valid){
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())){
                emailError.textContent = "Please enter a valid email address."
                emailError.classList.add('visible');
                email.classList.add('invalid');
                valid = false;
            }

            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');

            if(phone.value.replace(/\D/g, '').length !== 10){
                phoneError.textContent = 'Please enter a valid 10 digit phone number';
                phoneError.classList.add('visible');
                phone.classList.add('invalid');
                valid = false;
            }
        }
        if (valid){
            fetch('http://localhost:3000/contact', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: document.getElementById('first-name').value.trim(),
                    lastName: document.getElementById('last-name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    message: document.getElementById('message').value.trim()
                })
            })
            .then (function(res) {return res.json(); })
            .then (function(data) {
                if (data.success) {
                    alert('Message sent! We will get back to you soon.');
                    form.reset();
                } else{
                    alert('Something went wrong. Please try again');
                }
            })
            .catch(function() {
                alert('Something went wrong. Please try again.');
            });
        }      
    });
}
