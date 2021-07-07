<template>
  <rally-checkout-button v-pre></rally-checkout-button>
</template>

<script>
export default {
  name: 'RallyButton',
  mounted() {
    !function (e, t) {
      e.Rally = e.Rally || {}, e.Rally.init = e.Rally.init || function (t, n) {
        (e.Rally.q = e.Rally.q || []).push({action: "init", clientId: t, configuration: n})
      };
      var n = t.createElement("script");
      n.async = !0, n.noModule = !0, n.src = "https://develop.js.onrally.dev/checkout-button/elements-es5.js";
      var l = t.createElement("script");
      l.async = !0, l.setAttribute("type", "module"), l.src = "https://develop.js.onrally.dev/checkout-button/elements-es2015.js";
      var o = t.getElementsByTagName("script")[0];
      o.parentNode.insertBefore(n, o), o.parentNode.insertBefore(l, o)
    }(window, document);


    (function (win, doc) {
      win.platform = {};

      win.platform.getCartId = function () {
        return '60e43eba62c5a65db7a9733c';

        return fetch('apiUrlForRetrievingCartId',
          { credentials: 'same-origin' })
          .then(function (response) { return response.json(); })
          .then(function (cart) { return cart && cart.length > 0 ? cart[0].id : null; });
      }
    })(window, document);

    window.platform.getCartId() // should be defined by the platform connector - see bellow
      .then(function (cartId) {
        debugger
        var configuration = {
          redirect: true, // Should be set to false in case of a manual redirect - defaults to true
          lineItems: lineItems, // In case of custom cart the line items should be provided - see part Custom line items structure
          cartId: cartId, // When integrated with a platform the cart id should be provided
          // Add a failsafe with the fallbackUrl or fallbackButtonSelector options - this will allow your checkout pages to continue to work in case of our system failure
          fallbackButtonSelector: '[href="/checkout"]',
          fallbackUrl: 'https://rallycommerce.com/checkout'
        };
        Rally.init('clientId', configuration);
    });


  }
}
</script>
