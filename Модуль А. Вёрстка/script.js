//мобильное меню
const btn = document.querySelector('.mobile__header-nav__menu-button');
const mobileMenu = document.querySelector('.mobile__header-nav__menu');

btn.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile__header-nav__menu__show');

  if (mobileMenu.classList.contains('mobile__header-nav__menu__show')) {
    document.body.style.cssText = `
      overflow: hidden;
    `;

    const elementsToDisable = document.querySelectorAll(':not(.mobile__header-nav__menu-button, .mobile__header-nav__menu, .mobile__header-nav__menu__show)');
    elementsToDisable.forEach(element => {
      element.style.pointerEvents = 'none';
    });

    const elementsToEnable = document.querySelectorAll('.mobile__header-nav__menu-button, .mobile__header-nav__menu, .mobile__header-nav__menu__show');
    elementsToEnable.forEach(element => {
      element.style.pointerEvents = 'auto';

      element.querySelectorAll('*').forEach(childElement => {
        childElement.style.pointerEvents = 'auto';
      });
    });

  } else {
    document.body.style.cssText = '';
    const elementsToEnable = document.querySelectorAll('*');
    elementsToEnable.forEach(element => {
      element.style.pointerEvents = '';
    });
  }
});
 
//отмена переходов на tab
mobileMenu.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
      event.preventDefault();
      const focusableElements = mobileMenu.querySelectorAll('a, button'); 
      let currentFocus = document.activeElement;
      let nextFocus = focusableElements[0];
      for (let i = 0; i < focusableElements.length; i++) {
          if (focusableElements[i] === currentFocus) {
              nextFocus = focusableElements[i + 1] || focusableElements[0]; 
              break;
          }
      }
      nextFocus.focus();
  }
});

// слайдер
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slideCount = slides.length;
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Обновляем активную точку индикации
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
     function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Обработчики клика для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Автоматическое переключение слайдов 
    setInterval(nextSlide, 5000);
});

// поиск
const animalSearchInput = document.querySelector('.animal-search');
const suggestionsList = document.querySelector('.suggestions-list');
const searchButton = document.querySelector('.search-button');

// Пример массива видов животных (замените на ваши данные)
const animalTypes = [
    "Собака",
    "Кошка",
    "Хомяк",
    "Попугай",
    "Рыбка",
    "Черепаха",
    "Кролик",
    "Лошадь",
    "Корова",
    "Курица",
    "Слон"
];

animalSearchInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    suggestionsList.innerHTML = ''; // Очищаем список подсказок
    if (inputValue.length > 0) {
      const filteredAnimals = animalTypes.filter(animal => 
        animal.toLowerCase().startsWith(inputValue)
      );
      filteredAnimals.forEach(animal => {
          const listItem = document.createElement('li');
          listItem.textContent = animal;
          listItem.addEventListener('click', function() {
              animalSearchInput.value = animal;
              suggestionsList.style.display = 'none'; // Скрываем список после выбора
          });
          suggestionsList.appendChild(listItem);
      });
        if(filteredAnimals.length > 0) {
            suggestionsList.style.display = 'block'; // Показываем список если есть подсказки
        } else {
            suggestionsList.style.display = 'none';
        }
    } else {
        suggestionsList.style.display = 'none';
    }
});


animalSearchInput.addEventListener('blur', function() {
    //небольшая задержка перед тем как скрыть, чтобы клик успел сработать
    setTimeout(function(){
          suggestionsList.style.display = 'none'; //скрываем список, если фокус ушел с input
    }, 150); 
   
});


searchButton.addEventListener('click', function() {
    const searchTerm = animalSearchInput.value;
    if(searchTerm) {
        alert(`Вы ищете животное: ${searchTerm}`);
        // В этой части можно добавить код для перехода на страницу с результатами поиска
    } else {
        alert("Введите вид животного")
    }
    
});

// отзывы
const slider = document.querySelector('.reviews-slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const reviews = document.querySelectorAll('.review');

let currentIndex = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', function() {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlider();
});

nextButton.addEventListener('click', function() {
   currentIndex = Math.min(currentIndex + 1, reviews.length - 1);
    updateSlider();
});

