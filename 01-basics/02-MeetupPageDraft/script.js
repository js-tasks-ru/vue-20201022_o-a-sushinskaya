import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/** Регион **/
const LOCALE = 'ru-RU';

/** Параметры формата дати */
const DATE_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

/**
 * Возвращает дату с учетом настроек региона
 * @param date - значение даты в милисекундах
 * @return {string} - дата с учетом региона
 */
function getLocalDate(date) {
  return new Date(date).toLocaleDateString(LOCALE, DATE_OPTIONS);
}

/**
 * Возвращает ссылку на изображение встречи
 * @param imageId - номер изображения
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Возвращает информацию о встрече по номеру
 * @param id - номер встречи
 * @return {object} - обьект встречи
 */
async function getMeetupById(id) {
  let response = await fetch(`${API_URL}/meetups/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      isLoading: false,
      id: MEETUP_ID,
      meetupInfo: {}
    };
  },

  mounted() {
    this.getMeetupInfo();
  },

  computed: {
    agenda() {
      return this.meetupInfo.agenda ?? [];
    },
    isEmptyAgenda() {
      return !this.agenda.length;
    },
    title() {
      return this.meetupInfo.title ?? '';
    },
    description() {
      return this.meetupInfo.description ?? '';
    },
    organizer() {
      return this.meetupInfo.organizer ?? '';
    },
    place() {
      return this.meetupInfo.place ?? '';
    },
    time() {
      return this.getDateToString(this.meetupInfo.date);
    },
    meetapInfoStyle() {
      if (!this.meetupInfo.imageId) return '';
      return `--bg-url: url(${getMeetupCoverLink(this.meetupInfo.imageId)})`;
    }
  },

  methods: {
    async getMeetupInfo() {
      try {
        this.isLoading = true;
        const response = await getMeetupById(this.id);
        this.meetupInfo = response;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    getDateToString(date) {
      return getLocalDate(date);
    },
    getIconLink(type) {
      return `/assets/icons/icon-${agendaItemIcons[type]}.svg`;
    },
    getTitle(title, type) {
      return title || agendaItemTitles[type];
    },
    displayDot(speaker, language) {
      return Boolean(speaker && language);
    }
  }
});
