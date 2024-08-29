const images = ['blue.png', 'green.jpg', 'orange.jpg', 'purple.png', 'red.png'];

let activeImage = 0;

const sliderLine = document.querySelector('.slider-line');
const widthOffset = document.querySelector('.slider').offsetWidth;

sliderLine.style.width = 3 * widthOffset + 'px';
sliderLine.style.height = widthOffset + 'px';
sliderLine.style.left = '-' + widthOffset + 'px';

let isSlide = true;
let animationInterval;

const initSlider = () => {
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[activeImage];
    sliderLine.append(img);

    nextImageGenerate();
    prevImageGenerate();
    initPagination();
}

const nextImageGenerate = (imagesWidth = false) => {
    let nextImage = activeImage + 1;
    if (nextImage >= images.length) {
        nextImage = 0;
    }
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[nextImage];
    if (imagesWidth) {
        img.style.width = 0;
    }
    sliderLine.append(img);
}

const prevImageGenerate = () => {
    let prevImage = activeImage - 1;
    if (prevImage < 0) {
        prevImage = images.length - 1;
    }
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[prevImage];
    sliderLine.prepend(img);
}

const nextSlide = () => {
    if (!isSlide) {
        return;
    }

    isSlide = !isSlide;

    activeImage++;
    if (activeImage >= images.length) {
        activeImage = 0;
    }
    nextImageGenerate();
    animate({
        duration: 1000,
        draw: function (progress) {
            document.querySelector('.slider-line img').style.width = (widthOffset * (1 - progress)) + 'px';
        },
        removeElement: document.querySelector('.slider-line img')
    });
    updatePagination();
}

const prevSlide = () => {
    if (!isSlide) {
        return;
    }

    isSlide = !isSlide;
    activeImage--;
    if (activeImage < 0) {
        activeImage = images.length - 1;
    }
    prevImageGenerate(true);

    animate({
        duration: 1000,
        draw: function (progress) {
            document.querySelector('.slider-line img').style.width = (widthOffset * progress) + 'px';
        },
        removeElement: document.querySelector('.slider-line img:last-child')
    });
    updatePagination();
}

const animate = ({ duration, draw, removeElement }) => {
    const start = Date.now();
    const interval = 16;

    const animateStep = () => {
        const elapsed = Date.now() - start;
        let step = elapsed / duration;

        if (step > 1) {
            step = 1;
        }

        draw(step);

        if (step < 1) {
            animationInterval = setTimeout(animateStep, interval);
        } else {
            removeElement.remove();
            isSlide = true;
            clearTimeout(animationInterval);
        }
    }

    animateStep();
}

const initPagination = () => {
    const pagination = document.querySelector('.pagination');
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            activeImage = index;
            resetSlider();
            updatePagination();
        });
        pagination.appendChild(dot);
    });
    updatePagination();
}

const updatePagination = () => {
    const dots = document.querySelectorAll('.pagination .dot');
    dots.forEach((dot, index) => {
        if (index === activeImage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

const resetSlider = () => {
    sliderLine.innerHTML = '';
    const img = document.createElement('img');
    img.alt = '';
    img.src = './images/' + images[activeImage];
    sliderLine.append(img);
    nextImageGenerate();
    prevImageGenerate();
}

initSlider();

document.querySelector('.slide-next').addEventListener('click', nextSlide);
document.querySelector('.slide-prev').addEventListener('click', prevSlide);