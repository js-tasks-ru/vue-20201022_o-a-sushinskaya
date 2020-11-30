import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div>
             <MeetupView
                 v-if="isShowMeetup"
                 :meetup="meetup"/>
            </div>`,

  components: {
    MeetupView
  },

  data() {
    return {
      isLoading: false,
      meetup: null,
    };
  },

  computed: {
    isShowMeetup() {
      return Boolean(this.meetup);
    },
  },

  mounted() {
    this.getMeetupData();
  },

  methods: {
    async getMeetupData() {
      try {
        this.isLoading = true;
        const response = await fetchMeetup(MEETUP_ID);
        this.meetupInfo = response;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
