<template>
  <div>
    <ClientOnly>
      <vue-slider
        v-model="value"
        :value="value"
        :min="slider.minValue"
        :max="slider.maxValue"
        :interval="slider.interval"
        :clickable="false"
        tooltip="always"
        tooltip-placement="bottom"
        :tooltip-formatter="'{value}'"
        :process-style="slider.processStyle"
        :rail-style="slider.railStyle"
        :dot-size="20"
        @change="updateValue(value)"
      >
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>

        <template v-slot:tooltip="{ value: rangeValue }">
          <div class="label-sm">{{ formatTooltip(rangeValue) }}</div>
        </template>
      </vue-slider>
    </ClientOnly>
  </div>
</template>

<script>
// Helpers
import { mapState } from 'vuex'

// Components
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'RangeSlider',

  props: {
    filter: {
      type: Object,
      default: () => ({})
    },
    filterState: {
      type: Object,
      default: () => ({})
    },
    isPrice: {
      type: Boolean,
      default: false
    },
    withIntervals: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      value: null
    }
  },

  computed: {
    ...mapState(['currency']),

    currencyObj() {
      return this.$swell.currency.get(this.currency)
    },

    slider() {
      const [min, max] = this.filter.options
      let minValue = min.value
      let maxValue = max.value
      let interval = 1

      if (this.withIntervals) {
        if (minValue === maxValue) return
        interval = Math.ceil((maxValue - minValue) / 10) || 1
        if (interval > 1000) {
          interval = 1000
        } else if (interval > 100) {
          interval = 100
        } else if (interval > 10) {
          interval = 10
        }
        if (maxValue % interval > 0) {
          maxValue = interval + maxValue - (maxValue % interval)
        }
        if (minValue % interval > 0) {
          minValue = minValue - (minValue % interval)
        }
        while (((maxValue - minValue) / interval) % 1 > 0) {
          maxValue++
        }
      }

      return {
        minValue,
        maxValue,
        interval,
        railStyle: { background: this.$swell.settings.get('colors.primary.light') },
        processStyle: { background: this.$swell.settings.get('colors.primary.darkest') }
      }
    }
  },

  watch: {
    filterState: 'setValue'
  },

  created() {
    this.setValue()
  },

  methods: {
    formatTooltip(value) {
      if (this.isPrice) {
        const { rate } = this.currencyObj
        const price = rate ? value * rate : value

        return new Intl.NumberFormat('default', {
          style: 'currency',
          currency: this.currency,
          currencyDisplay: 'narrowSymbol',
          maximumFractionDigits: 0
        }).format(price)
      }
      return value
    },

    setValue() {
      const [min, max] = this.filter.options
      const stateValue = this.filterState[this.filter.id]

      // Use the state value if it exists, otherwise the filter's min/max
      this.value = stateValue || [min.value, max.value]
    },

    updateValue(value) {
      const [min, max] = this.filter.options
      let optionValue

      // If the value isn't the same as the filter's min/max, pass it on
      if (value[0] !== min.value || value[1] !== max.value) {
        optionValue = value
      }
      // Otherwise, don't pass anything so the filter gets removed

      this.$emit('change', { filter: this.filter, optionValue })
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-dot {
  @apply w-full h-full bg-primary-lightest rounded-full border border-primary-med;
  transition: all 0.3s;

  &.focus {
    @apply border-primary-darkest;
  }
}
</style>
