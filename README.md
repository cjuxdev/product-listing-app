# Product Listing App
A responsive product listing application built with Vue.js that supports filtering, sorting, pagination, and category selection. This app demonstrates modern web development practices such as state management with Vuex, component-based architecture, and integration with external services.

## Features
- Product Listing with Categories
- Filtering by Type and Category
- Pagination with Dynamic Page Updates
- Sorting by Name (Alphabetical) and Price
- State Management with Vuex
- Responsive Design
- Vue Router for Navigation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Project Structure

```bash
product-listing-app/
├── public/
│   ├── mock-data/
│   │   ├── products.json
│   │   └── categories.json
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── img/
│   ├── components/
│   │   ├── CategoryBar.vue
│   │   ├── NavBar.vue
│   │   ├── ProductCard.vue
│   │   └── PaginationBar.vue
│   ├── services/
│   │   ├── productService.js
│   │   └── productCategoryService.js
│   ├── store/
│   │   └── index.js
│   ├── views/
│   │   └── LandingPage.vue
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```


## Product Data
This file contains all the product details, such as name, price, category, etc.

**Location:** `public/mock-data/products.json`

## Categories Data
This file contains the categories and subcategories for filtering the products.

**Location:** `public/mock-data/productCategories.json`

## Additional Resources

* [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
* [Vuex Documentation](https://vuex.vuejs.org/)
* [SCSS Documentation](https://sass-lang.com/documentation)

### Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Developed By

[Chathura Jayaranga](https://github.com/chathuraj)
