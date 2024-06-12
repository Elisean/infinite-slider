const allImages = [
     './images/image-1.png',
     './images/image-2.png',
     './images/image-3.png',
     './images/image-4.png',
     './images/image-5.png',
     './images/image-6.jpg',
     './images/image-7.png',
     './images/image-8.png',
     './images/image-9.png',
     './images/image-10.png' 
    ];

const sliderInner = document.querySelector('.slider-inner');
const btnNext = document.querySelector('.slider-arrow-next');
const btnPrev = document.querySelector('.slider-arrow-prev');
const sliderPagination = document.querySelector('.slider-pagination');

let count = 0;
let isAnimate = false;
let animationInterval;

const initSlider = (images) => {
    images.forEach((imageSrc, index) => {
        const imageItem = document.createElement('img');
        imageItem.src = imageSrc;
        imageItem.alt = `Image ${index + 1}`;
        imageItem.classList.add('slider-image');
        imageItem.style.minWidth = '100%';
        sliderInner.appendChild(imageItem);

        const sliderPaginate = document.createElement('div');
        sliderPaginate.classList.add('slider-paginate');
        sliderPaginate.dataset.index = index;
        sliderPagination.appendChild(sliderPaginate);

        sliderPaginate.addEventListener('click', (event) => {
            if (!isAnimate) {
                const newIndex = parseInt(event.target.dataset.index);
                updateSlider(newIndex);
            }
        });
    });

    const firstSlide = document.querySelector('.slider-image');
    firstSlide.classList.add('active');
    const firstPaginate = document.querySelector('.slider-paginate');
    firstPaginate.classList.add('active');
}

const updateSlider = (newIndex) => {
    isAnimate = true;
    const slides = document.querySelectorAll('.slider-image');
    const paginates = document.querySelectorAll('.slider-paginate');

    slides.forEach((slide) => slide.classList.remove('active'));
    paginates.forEach((paginate) => paginate.classList.remove('active'));

    slides[newIndex].classList.add('active');
    paginates[newIndex].classList.add('active');
    count = newIndex;
  
    setTimeout(() => {
        isAnimate = false;
    }, 1000); 
}

const nextSlide = () => {
    if (!isAnimate) {
        count = (count + 1 + allImages.length) % allImages.length;
        updateSlider(count);
    }
}

const prevSlide = () => {
    if (!isAnimate) {
        count = (count - 1 + allImages.length) % allImages.length;
        updateSlider(count);
    }
}

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

initSlider(allImages);