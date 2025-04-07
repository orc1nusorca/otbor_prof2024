// плагинация
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const resultsBody = document.getElementById('results-body');
  const paginationDiv = document.getElementById('pagination');
  const resultsPerPage = 10;

  // Имитация данных
  const animalsData = [
      {
          "id": 1,
          "type": "Собака",
          "photo": "https://placekitten.com/100/100",
          "description": "Найдена возле магазина",
          "tattoo": "АБ123",
          "district": "Центральный",
          "date": "2023-10-26",
          "contact": "89111111111"
      },
      {
          "id": 2,
          "type": "Кошка",
          "photo": "https://placekitten.com/101/101",
          "description": "Найдена в парке",
          "tattoo": "",
          "district": "Ленинский",
          "date": "2023-10-25",
          "contact": "89222222222"
      },
      {
          "id": 3,
          "type": "Собака",
          "photo": "https://placekitten.com/102/102",
          "description": "Найдена в лесу",
          "tattoo": "ВГ456",
          "district": "Приморский",
          "date": "2023-10-24",
          "contact": "89333333333"
      },
      {
          "id": 4,
          "type": "Попугай",
          "photo": "https://placekitten.com/103/103",
          "description": "Случайно залетел в окно",
          "tattoo": "",
          "district": "Кировский",
          "date": "2023-10-23",
          "contact": "89444444444"
      },
      {
          "id": 5,
          "type": "Кошка",
          "photo": "https://placekitten.com/104/104",
          "description": "Найдена у подъезда",
          "tattoo": "ДЕ789",
          "district": "Московский",
          "date": "2023-10-22",
          "contact": "89555555555"
      },
      {
          "id": 6,
          "type": "Собака",
          "photo": "https://placekitten.com/105/105",
          "description": "Найдена в районе рынка",
          "tattoo": "ЖЗ012",
          "district": "Центральный",
          "date": "2023-10-21",
          "contact": "89666666666"
      },
      {
          "id": 7,
          "type": "Хомяк",
          "photo": "https://placekitten.com/106/106",
          "description": "Найдена на улице",
          "tattoo": "",
          "district": "Адмиралтейский",
          "date": "2023-10-20",
          "contact": "89777777777"
      },
      {
          "id": 8,
          "type": "Собака",
          "photo": "https://placekitten.com/107/107",
          "description": "Найдена возле детской площадки",
          "tattoo": "ИЙ345",
          "district": "Выборгский",
          "date": "2023-10-19",
          "contact": "89888888888"
      },
      {
          "id": 9,
          "type": "Кошка",
          "photo": "https://placekitten.com/108/108",
          "description": "Найдена в саду",
          "tattoo": "",
          "district": "Петроградский",
          "date": "2023-10-18",
          "contact": "89999999999"
      },
      {
          "id": 10,
          "type": "Собака",
          "photo": "https://placekitten.com/109/109",
          "description": "Найдена на автобусной остановке",
          "tattoo": "КЛ678",
          "district": "Красносельский",
          "date": "2023-10-17",
          "contact": "89123456789"
      },
      {
        "id": 11,
        "type": "Кролик",
        "photo": "https://placekitten.com/110/110",
        "description": "Найдена на газоне",
        "tattoo": "",
        "district": "Калининский",
        "date": "2023-10-16",
        "contact": "89654321789"
      },
      {
          "id": 12,
          "type": "Собака",
          "photo": "https://placekitten.com/111/111",
          "description": "Найдена на берегу реки",
          "tattoo": "МН901",
          "district": "Василеостровский",
          "date": "2023-10-15",
          "contact": "89876543210"
      },
      {
          "id": 13,
          "type": "Кошка",
          "photo": "https://placekitten.com/112/112",
          "description": "Найдена в подвале",
          "tattoo": "",
          "district": "Невский",
          "date": "2023-10-14",
          "contact": "89112233445"
      },
      {
          "id": 14,
          "type": "Собака",
          "photo": "https://placekitten.com/113/113",
          "description": "Найдена в парке аттракционов",
          "tattoo": "ОП234",
          "district": "Фрунзенский",
          "date": "2023-10-13",
          "contact": "89554433221"
      }
  ];

  function filterAndDisplay(page = 1) {
      const typeFilter = document.getElementById('search-type').value.toLowerCase();
      const districtFilter = document.getElementById('search-district').value.toLowerCase();

      const filteredAnimals = animalsData.filter(animal =>
        animal.type.toLowerCase().includes(typeFilter) &&
        animal.district.toLowerCase().includes(districtFilter)
      );
      const startIndex = (page - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const pageAnimals = filteredAnimals.slice(startIndex, endIndex);

      resultsBody.innerHTML = ""; // Clear previous results
      pageAnimals.forEach(animal => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${animal.type}</td>
          <td><img src="${animal.photo}" alt="Фото"></td>
          <td>${animal.description}</td>
          <td>${animal.tattoo || '-'}</td>
          <td>${animal.district}</td>
          <td>${animal.date}</td>
          <td>${animal.contact}</td>
        `;
        resultsBody.appendChild(row);
      });

      renderPagination(filteredAnimals.length, page);
  }

  function renderPagination(totalResults, currentPage) {
      const totalPages = Math.ceil(totalResults / resultsPerPage);
      paginationDiv.innerHTML = ''; // Clear previous pagination

      if (totalPages <= 1) return; // Не создавать пагинацию если страниц нету

      for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = i;
        if (i === currentPage) {
          link.classList.add('active');
        }
        link.addEventListener('click', (e) => {
          e.preventDefault();
          filterAndDisplay(i);
        });
        paginationDiv.appendChild(link);
      }
  }

  searchForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form submission
      filterAndDisplay(1); // Reset page to 1 on new search
  });

  // Initial display of all animals
  filterAndDisplay(1);
});

