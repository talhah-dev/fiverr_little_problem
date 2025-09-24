const INACTIVE_SRC = '/images/Slider_Bullet.png';
const ACTIVE_SRC = '/images/Slider_BulletActive.png';

const swiper = new Swiper('.mySwiper', {
    loop: true,
    speed: 700,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    // optional: enable arrow-key navigation too
    keyboard: { enabled: true }
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

document.getElementById('prevBtn').addEventListener('click', () => swiper.slidePrev(600));
document.getElementById('nextBtn').addEventListener('click', () => swiper.slideNext(600));


// animation
AOS.init({
    duration: 800,
    once: false,
    mirror: true,
});

// parallex

(() => {
    const els = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;

    // Reduce intensity a bit on small screens
    const scale = window.matchMedia('(max-width: 768px)').matches ? 0.7 : 1;

    let lastY = window.scrollY, ticking = false;

    function onScroll() {
        lastY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(apply);
            ticking = true;
        }
    }

    function apply() {
        els.forEach(el => {
            const s = parseFloat(el.dataset.speed || '0.1') * scale;
            el.style.transform = `translate3d(0, ${lastY * s}px, 0)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial position
    apply();
})();
