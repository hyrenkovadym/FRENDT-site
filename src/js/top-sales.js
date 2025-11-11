document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.top-sales__slide');
    const left = document.querySelector('.top-sales__arrow--left');
    const right = document.querySelector('.top-sales__arrow--right');
    let current = 0;
    let autoSlide;

    function showSlides() {
        slides.forEach(slide => {
            slide.classList.remove('active', 'left', 'right');
        });

        // поточний
        slides[current].classList.add('active', 'left');

        // наступний (по колу)
        const next = (current + 1) % slides.length;
        slides[next].classList.add('active', 'right');
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlides();
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlides();
    }

    right.addEventListener('click', () => {
        nextSlide();
        resetAuto();
    });

    left.addEventListener('click', () => {
        prevSlide();
        resetAuto();
    });

    function startAuto() {
        autoSlide = setInterval(nextSlide, 30000);
    }

    function resetAuto() {
        clearInterval(autoSlide);
        startAuto();
    }

    showSlides();
    startAuto();
});
