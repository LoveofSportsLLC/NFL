document.addEventListener('DOMContentLoaded', function () {
  const date = new Date();
  const monthYear = document.getElementById('month-year');
  const daysContainer = document.querySelector('.days-grid');

  function renderCalendar() {
    date.setDate(1);
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    monthYear.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
    daysContainer.innerHTML = '';

    for (let x = firstDayIndex; x > 0; x--) {
      daysContainer.innerHTML += `<div class="prev-date">${lastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        daysContainer.innerHTML += `<div class="today">${i}</div>`;
      } else {
        daysContainer.innerHTML += `<div>${i}</div>`;
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      daysContainer.innerHTML += `<div class="next-date">${j}</div>`;
    }
  }

  document.getElementById('prev-month').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});
