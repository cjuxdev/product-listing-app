<template>
  <div class="saleBar">
    <div class="container">
      Get 25% off this Summer Sale : Grab It Fast : {{ hours }}H :
      {{ minutes }}M : {{ seconds }}S
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hours: 15,
      minutes: 45,
      seconds: 12,
      intervalId: null,
    };
  },

  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    startCountdown() {
      this.intervalId = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else if (this.minutes > 0) {
          this.seconds = 59;
          this.minutes--;
        } else if (this.hours > 0) {
          this.seconds = 59;
          this.minutes = 59;
          this.hours--;
        } else {
          clearInterval(this.intervalId); // Stop the countdown when it reaches zero
        }
      }, 1000);
    },
  },
};
</script>
