    (function () {
      const track = document.getElementById('slidesTrack');
      const slides = Array.from(track.children);
      if (slides.length === 0) return;
      const nextBtn = document.getElementById('nextBtn');
      const prevBtn = document.getElementById('prevBtn');
      const dotsContainer = document.getElementById('dotsContainer');
      let currentIndex = 0;
      const totalSlides = slides.length;
      let autoInterval = null;
      const AUTO_DELAY = 5000;

      function updateSlider(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        const shiftPercent = -currentIndex * 100;
        track.style.transform = `translateX(${shiftPercent}%)`;
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => { dot.classList.toggle('active', i === currentIndex); });
      }

      function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (i === currentIndex) dot.classList.add('active');
          dot.setAttribute('data-index', i);
          dot.addEventListener('click', () => { resetAutoPlay(); updateSlider(i); startAutoPlay(); });
          dotsContainer.appendChild(dot);
        }
      }

      function nextSlide() { updateSlider(currentIndex + 1); }
      function prevSlide() { updateSlider(currentIndex - 1); }
      function startAutoPlay() { if (autoInterval) clearInterval(autoInterval); autoInterval = setInterval(() => nextSlide(), AUTO_DELAY); }
      function resetAutoPlay() { if (autoInterval) { clearInterval(autoInterval); autoInterval = null; } }

      nextBtn.addEventListener('click', () => { resetAutoPlay(); nextSlide(); startAutoPlay(); });
      prevBtn.addEventListener('click', () => { resetAutoPlay(); prevSlide(); startAutoPlay(); });

      const sliderElement = document.querySelector('.slider');
      let touchStartX = 0, touchEndX = 0;
      sliderElement.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; resetAutoPlay(); }, { passive: true });
      sliderElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 50) deltaX > 0 ? prevSlide() : nextSlide();
        startAutoPlay();
      });
      sliderElement.addEventListener('mouseenter', () => resetAutoPlay());
      sliderElement.addEventListener('mouseleave', () => startAutoPlay());

      createDots();
      updateSlider(0);
      startAutoPlay();
    })();