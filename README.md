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

product-listing-app/ ├── public/ │ ├── index.html │ └── favicon.ico ├── src/ │ ├── assets/ │ │ └── img/ │ ├── components/ │ │ ├── CategoryBar.vue │ │ ├── NavBar.vue │ │ ├── ProductCard.vue │ │ └── PaginationBar.vue │ ├── services/ │ │ ├── productService.js │ │ └── productCategoryService.js │ ├── store/ │ │ └── index.js │ ├── views/ │ │ └── LandingPage.vue │ ├── App.vue │ └── main.js ├── package.json └── README.md


## Dummy Data Store

The application uses two JSON files to mock product data and categories. These files are stored in the `src/assets/data/` directory.

Here are the paths to the dummy data files:

1. **Product Data**: `src/assets/data/products.json`  
   This file contains all the product details, such as name, price, category, etc.

2. **Categories Data**: `src/assets/data/productCategories.json`  
   This file contains the categories and subcategories for filtering the products.


## Additional Resources
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vuex Documentation](https://vuex.vuejs.org/)
- [SCSS Documentation](https://sass-lang.com/documentation)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Developed By

**[Chathura Jayaranga](https://github.com/chathuraj)** 
