(() => {
  const sliderContainer = document.getElementById('sliderContainer');
  const sliderTrack = document.getElementById('sliderTrack');

  const popup = document.getElementById('popup');
  const popupClose = document.getElementById('popupClose');
  const popupLogo = document.getElementById('popupLogo');
  const popupName = document.getElementById('popupName');
  const popupDescription = document.getElementById('popupDescription');

  const visibleCount = 5;
  const slideWidth = 190; 

  let companies = [];
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationFrameId = 0;

  let isDragging = false;
  let dragStartX = 0;
  let dragCurrentX = 0;
  let dragDiff = 0;

  let autoSlideTimer = null;

  
  fetch('companies.json')
    .then(res => res.json())
    .then(data => {
      companies = data;
      buildSlides();
      goToSlide(0, false);
      startAutoSlide();
    })
    .catch(e => console.error('Failed to load companies.json:', e));

  function buildSlides() {
    sliderTrack.innerHTML = '';

    
    companies.forEach(company => {
      const slide = document.createElement('div');
      slide.className = 'slide';

      const img = document.createElement('img');
      img.src = company.logo;
      img.alt = company.name;
      img.draggable = false;

      
      img.addEventListener('click', () => {
        if (!isDragging) openPopup(company);
      });

      slide.appendChild(img);
      sliderTrack.appendChild(slide);
    });
  }

  // Set slider position to show slideIndex
  function goToSlide(slideIndex, animate = true) {
    if (animate) {
      sliderTrack.style.transition = 'transform 0.4s ease';
    } else {
      sliderTrack.style.transition = 'none';
    }

    // Clamp slideIndex to valid range
    if (slideIndex < 0) slideIndex = 0;
    if (slideIndex > companies.length - visibleCount) slideIndex = companies.length - visibleCount;

    currentTranslate = -slideIndex * slideWidth;
    prevTranslate = currentTranslate;
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  }

  function startAutoSlide() {
    clearTimeout(autoSlideTimer);
    autoSlideTimer = setTimeout(() => {
      if (!isDragging) {
        nextSlide();
        startAutoSlide();
      }
    }, 3000);
  }

  function nextSlide() {
    let nextIndex = Math.round(-prevTranslate / slideWidth) + 1;
    if (nextIndex > companies.length - visibleCount) {
      nextIndex = 0;
    }
    goToSlide(nextIndex);
  }

  // Dragging handlers
  function onDragStart(e) {
    isDragging = true;
    dragStartX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    dragCurrentX = dragStartX;
    sliderTrack.style.transition = 'none';
    sliderContainer.style.cursor = 'grabbing';
    clearTimeout(autoSlideTimer);

    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    dragCurrentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    dragDiff = dragCurrentX - dragStartX;

    let nextTranslate = prevTranslate + dragDiff;

    // Optional boundaries to prevent dragging too far
    const maxTranslate = 0;
    const minTranslate = -slideWidth * (companies.length - visibleCount);

    if (nextTranslate > maxTranslate) nextTranslate = maxTranslate;
    if (nextTranslate < minTranslate) nextTranslate = minTranslate;

    currentTranslate = nextTranslate;
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    sliderContainer.style.cursor = 'grab';

    // Snap to closest slide after drag end
    const slideIndex = Math.round(-currentTranslate / slideWidth);
    goToSlide(slideIndex);

    prevTranslate = -slideIndex * slideWidth;
    currentTranslate = prevTranslate;

    startAutoSlide();

    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchend', onDragEnd);
  }

  // Popup open/close
  function openPopup(company) {
    popupLogo.src = company.logo;
    popupLogo.alt = company.name + ' logo';
    popupName.textContent = company.name;
    popupDescription.textContent = company.description;
    popup.classList.remove('hidden');
  }

  popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  popup.addEventListener('click', e => {
    if (e.target === popup) {
      popup.classList.add('hidden');
    }
  });

  // Attach dragstart to container
  sliderContainer.addEventListener('mousedown', onDragStart);
  sliderContainer.addEventListener('touchstart', onDragStart);
})();
