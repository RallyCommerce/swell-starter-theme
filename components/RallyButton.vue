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
    }
  },
  mounted() {
      var configuration = {
            redirect: true, // Should be set to false in case of a manual redirect - defaults to true
            cartId: this.getCartId(), // When integrated with a platform the cart id should be provided
            fallbackUrl: this.link
      };
      window.Rally.init('93cc2061-34ac-4611-880f-5e21dcfcbaee', configuration);
  },
  methods: {
    getCartId() {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) { return parts.pop().split(';').shift() };
    }
  }
}
</script>
