export const MeetupCover = {
  template: `<div class="meetup-cover" :style="style">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  props: {
    link: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Название митапа',
    },
  },
  computed: {
    style() {
      return this.link
        ? `--bg-url: url(${this.link})`
        : '';
    },
  },
};
