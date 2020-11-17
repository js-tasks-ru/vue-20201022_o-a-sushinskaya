export const CounterButton = {
  template: '<button type="button" @click="onClick">{{ count }}</button>',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  model: {
    prop: 'count',
    event: 'increment'
  },
  methods: {
    onClick() {
      return this.$emit('increment', this.count + 1);
    }
  }
};
