<template>
  <rally-checkout-button v-pre></rally-checkout-button>
</template>

<script>
export default {
  name: 'RallyButton',
  props: {
    link: {
      type: [Object, String],
      default: ''
    },
    cartId: {
      type: String,
      default: ''
    }
  },
  mounted() {
      var configuration = {
            redirect: true,
            fallbackUrl: this.link,
            cartId: this.cartId
      };
      window.Rally.init('9476d5b3-5fe9-4e19-92e2-514f5c84d9e3', configuration);
  },
  methods: {
  }
}
</script>
