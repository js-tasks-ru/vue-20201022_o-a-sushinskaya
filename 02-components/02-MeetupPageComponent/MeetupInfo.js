export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time datetime="2020-01-01">{{ time }}</time>
      </li>
    </ul>`,

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },

  data() {
    return {
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    };
  },

  computed: {
    time() {
      return this.date.toLocaleDateString(
        window.navigator.language,
        this.dateOptions,
      );
    },
  },
};
