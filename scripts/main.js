AOS.init({
    once: true
})

const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', function(){
    mobileNav.classList.toggle('open');
});

const classHeader = document.getElementById('class-header');

const observer = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            classHeader.classList.add('animate');
        }
    });
});

observer.observe(classHeader);