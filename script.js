const INACTIVE_SRC = '/images/Slider_Bullet.png';
const ACTIVE_SRC = '/images/Slider_BulletActive.png';

const swiper = new Swiper('.mySwiper', {
    loop: true,
    speed: 700,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }
});

const container = document.getElementById('customPagination');

function getRealSlideCount() {
    return document.querySelectorAll('.mySwiper .swiper-slide:not(.swiper-slide-duplicate)').length;
}

function buildBullets() {
    const total = getRealSlideCount();
    container.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const img = document.createElement('img');
        img.src = (i === swiper.realIndex) ? ACTIVE_SRC : INACTIVE_SRC;
        img.alt = `Go to slide ${i + 1}`;
        img.className = 'h-3 md:h-6 cursor-pointer select-none';
        img.dataset.index = i;
        container.appendChild(img);
    }
}

function updateBullets() {
    const imgs = container.querySelectorAll('img');
    imgs.forEach((img, i) => {
        img.src = (i === swiper.realIndex) ? ACTIVE_SRC : INACTIVE_SRC;
    });
}

container.addEventListener('click', (e) => {
    const t = e.target.closest('img');
    if (!t) return;
    swiper.slideToLoop(parseInt(t.dataset.index, 10), 600);
});

swiper.on('afterInit', () => {
    buildBullets();
    updateBullets();
});
swiper.on('slideChange', updateBullets);

if (swiper.initialized) {
    buildBullets();
    updateBullets();
}

// animation
AOS.init({
    duration: 800,
    once: false,
    mirror: true,
});