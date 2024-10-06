<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div
        class="container-fluid d-flex justify-content-between align-items-center"
      >
        <!-- Left side: Menu items -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Men</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">Women</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">New & Featured</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Men</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Gift</a>
            </li>
          </ul>
        </div>

        <!-- Center: Brand logo (positioned using absolute center) -->
        <a
          class="navbar-brand position-absolute start-50 translate-middle-x"
          href="#"
        >
          <img :src="logoSrc" alt="Brand" class="brand" />
        </a>

        <!-- Right side: Search icon, Cart icon, Login button -->
        <div class="d-flex align-items-center right-section">
          <a href="#" class="">
            <i class="bi bi-search"></i>
          </a>
          <a href="#" class="">
            <i class="bi bi-cart"></i>
          </a>
          <a href="#" class="login"> Login </a>
        </div>
      </div>
    </nav>
  </div>
  <div class="sub-title">
    <p>
      The Ultimate House of Luxury, defining style and creating desire, now and
      forever
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: require("@/assets/img/TULOZ.png"), // Using `require()` to reference the image
    };
  },
};
</script>
