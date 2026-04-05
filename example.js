/* ===================================================== */
/* example.js - Скрипты для статьи ЖК «Квартал Ивакино» */
/* ===================================================== */

// Функция для инициализации слайдера
function initSlider(mainSelector, thumbsSelector) {
  const mainEl = document.querySelector(mainSelector);
  const thumbsEl = document.querySelector(thumbsSelector);
  
  if (!mainEl || !thumbsEl) return;
  
  const thumbsSwiper = new Swiper(thumbsSelector, {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });
  
  const mainSwiper = new Swiper(mainSelector, {
    loop: true,
    navigation: {
      nextEl: `${mainSelector} .swiper-button-next`,
      prevEl: `${mainSelector} .swiper-button-prev`,
    },
    pagination: {
      el: `${mainSelector} .swiper-pagination-fraction`,
      type: 'fraction',
    },
    thumbs: {
      swiper: thumbsSwiper
    }
  });
  
  mainSwiper.on('slideChange', function() {
    const realIndex = mainSwiper.realIndex;
    const container = document.querySelector(mainSelector).closest('.cs-slider-section');
    const descriptions = container.querySelectorAll('.slider-description__text');
    
    descriptions.forEach(text => text.classList.remove('active'));
    
    const activeDesc = container.querySelector(`.slider-description__text--${realIndex + 1}`);
    if (activeDesc) activeDesc.classList.add('active');
  });
}

// Функция для плашек выбора планировки
function initPlanCards() {
  const planCards = document.querySelectorAll('.cs-plan-card');
  let selectedPlan = null;
  
  planCards.forEach(card => {
    card.addEventListener('click', function() {
      planCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      selectedPlan = this.getAttribute('data-plan');
    });
  });
  
  const detailsBtn = document.getElementById('planDetailsBtn');
  if (detailsBtn) {
    detailsBtn.addEventListener('click', function() {
      if (selectedPlan) {
        alert(`Вы выбрали ${selectedPlan}-комнатную квартиру. Здесь будет форма или переход на страницу с подробностями.`);
      } else {
        alert('Пожалуйста, выберите планировку');
      }
    });
  }
}

// Функция для опроса
function initSurvey() {
  const yesBtn = document.getElementById('surveyYesBtn');
  const noBtn = document.getElementById('surveyNoBtn');
  const yesBlock = document.getElementById('surveyYesBlock');
  const noBlock = document.getElementById('surveyNoBlock');
  const otherRadio = document.getElementById('otherReasonRadio');
  const otherField = document.getElementById('otherReasonField');
  const submitBtn = document.getElementById('surveySubmitBtn');
  
  if (yesBtn) {
    yesBtn.addEventListener('click', function() {
      yesBlock.style.display = 'block';
      noBlock.style.display = 'none';
    });
  }
  
  if (noBtn) {
    noBtn.addEventListener('click', function() {
      noBlock.style.display = 'block';
      yesBlock.style.display = 'none';
    });
  }
  
  if (otherRadio) {
    otherRadio.addEventListener('change', function() {
      otherField.style.display = this.checked ? 'block' : 'none';
    });
  }
  
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      const selectedRadio = document.querySelector('input[name="surveyReason"]:checked');
      if (selectedRadio) {
        let reason = selectedRadio.value;
        if (reason === 'Другое') {
          const otherText = document.querySelector('#otherReasonField textarea');
          if (otherText && otherText.value.trim()) {
            reason = otherText.value.trim();
          }
        }
        console.log('Выбранная причина:', reason);
        alert('Спасибо за ваш ответ!');
      } else {
        alert('Пожалуйста, выберите причину');
      }
    });
  }
}

// Запускаем все после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  initSlider('.mainSwiper', '.thumbsSwiper');
  initSlider('.mainSwiper2', '.thumbsSwiper2');
  initSlider('.mainSwiper3', '.thumbsSwiper3');
  initSlider('.mainSwiper4', '.thumbsSwiper4');
  initPlanCards();
  initSurvey();
});