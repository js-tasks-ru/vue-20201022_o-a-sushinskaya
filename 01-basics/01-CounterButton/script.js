import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',
  data: {
    buttonCounter: 0,
    isActiveCircle: false
  },
  methods: {
    handlerButton(e) {
      this.setStickyCircle(e);
      this.isActiveCircle = true;
      setTimeout(this.clearActiveElement, 200);
      this.buttonCounter++;
    },
    resetDefault() {
      this.clearActiveElement();
      this.buttonCounter = 0;
    },
    clearActiveElement() {
      this.isActiveCircle = false;
    },
    setStickyCircle(e) {
      this.$refs.circle.style.left = `${e.pageX}px`;
      this.$refs.circle.style.top = `${e.pageY}px`;
    }
  },
  directives: {
    'click-outside': {
      bind(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        document.addEventListener('click', handler);
      },
      unbind(el) {
        document.removeEventListener('click', el);
      }
    }
  }
});
