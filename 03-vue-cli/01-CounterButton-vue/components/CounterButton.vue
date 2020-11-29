<template>
  <button type="button" @click="onClick">{{ count }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    onClick() {
      return this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style></style>
