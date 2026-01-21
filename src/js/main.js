import * as alias from "./api/mealdb.js";
import * as productsAPI from "./api/productsdb.js";
import * as nutrientsAPI from "./api/nutrientsdb.js";

const navLinks = document.querySelectorAll("nav .nav-link");
const header = document.getElementById("header")
const categoriesSection = document.getElementById("categories-section");
const productsSection = document.getElementById("products-section");
const foodlogSection = document.getElementById("foodlog-section");
const recipesGrid = document.getElementById("recipes-grid");
const categoriesGrid = document.getElementById("categories-grid");
const areasContainer = document.getElementById("areas-container");
const productsGrid = document.getElementById("products-grid");

// Global array to store logged meals
let loggedMeals = [];

async function DisplayAllMeals() {

  const allMeals = (await alias.FetchMealsFilterByKeyword()).results;
  allMealsCache = allMeals; // Cache the meals for filtering
  let cartona = ``;

  for (let i = 0; i < allMeals.length; i++) {
    cartona += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${allMeals[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${allMeals[i].thumbnail}"
                  alt="${allMeals[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${allMeals[i].name}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${allMeals[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${allMeals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${allMeals[i].instructions[0]}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${allMeals[i].name}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${allMeals[i].name}
                  </span>
                </div>
              </div>
            </div>
    `
  }
  recipesGrid.innerHTML = cartona;
  AttachRecipeCardListeners();
}

function Navigation() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {

      categoriesSection.classList.add("hidden")
      productsSection.classList.add("hidden")
      foodlogSection.classList.add("hidden")

      if (this.querySelector("span").innerHTML == "Meals &amp; Recipes") {
        categoriesSection.classList.remove("hidden");
        navLinks[0].classList.add("bg-emerald-50", "text-emerald-700");
        navLinks[0].classList.remove("text-gray-600", "hover:bg-gray-50");
        navLinks[1].classList.remove("bg-emerald-50", "text-emerald-700");
        navLinks[2].classList.remove("bg-emerald-50", "text-emerald-700");
        header.querySelector("h1").innerHTML = "Meals & Recipes";
        header.querySelector("p").innerHTML = "Discover delicious and nutritious recipes tailored for you";
      }
      if (this.querySelector("span").innerHTML == "Product Scanner") {
        productsSection.classList.remove("hidden");
        navLinks[0].classList.remove("bg-emerald-50", "text-emerald-700");
        navLinks[0].classList.add("text-gray-600", "hover:bg-gray-50");

        navLinks[1].classList.remove("text-gray-600", "hover:bg-gray-50");

        navLinks[1].classList.add("bg-emerald-50", "text-emerald-700");
        navLinks[2].classList.remove("bg-emerald-50", "text-emerald-700");
        header.querySelector("h1").innerHTML = "Product Scanner";
        header.querySelector("p").innerHTML = "Search packaged foods by name or barcode";
      }
      if (this.querySelector("span").innerHTML == "Food Log") {
        foodlogSection.classList.remove("hidden");
        navLinks[0].classList.remove("bg-emerald-50", "text-emerald-700");
        navLinks[0].classList.add("text-gray-600", "hover:bg-gray-50");

        navLinks[1].classList.remove("bg-emerald-50", "text-emerald-700");
        navLinks[2].classList.remove("text-gray-600", "hover:bg-gray-50");

        navLinks[2].classList.add("bg-emerald-50", "text-emerald-700");
        header.querySelector("h1").innerHTML = "Food Log";
        header.querySelector("p").innerHTML = "Track your daily nutrition and food intake";
      }
    })

  }
}

async function DisplayAreas() {


  const areas = (await alias.FetchAllAreas()).results;

  let cartona = `<button
              class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
              All Recipes
            </button>`;
  for (let i = 0; i < areas.length; i++) {
    cartona += `
  <button
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
              ${areas[i].name}
            </button>
  `
  }
  areasContainer.innerHTML = cartona;

}

async function DisplayCategories() {
  const categories = (await alias.FetchAllCategories()).results;

  let cartona = ``;
  for (let i = 0; i < categories.length; i++) {
    cartona += ` <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${categories[i].name}">
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${categories[i].name}</h3>
                </div>
              </div>
            </div>
  `
  }
  categoriesGrid.innerHTML = cartona;
}

async function DisplayRecipeDetails(mealId) {
  try {
    // Fetch meal details from API
    const mealData = await alias.FetchMealById(mealId);

    const meal = mealData.result;

    // Hide all sections in categories-section
    const searchFiltersSection = document.getElementById("search-filters-section");
    const mealCategoriesSection = document.getElementById("meal-categories-section");
    const allRecipesSection = document.getElementById("all-recipes-section");
    const mealDetailsSection = document.getElementById("meal-details");

    searchFiltersSection.classList.add("hidden");
    mealCategoriesSection.classList.add("hidden");
    allRecipesSection.classList.add("hidden");
    mealDetailsSection.classList.remove("hidden");

    // Update hero image and title
    const heroImage = mealDetailsSection.querySelector(".relative.h-80 img");
    if (heroImage) {
      heroImage.src = meal.thumbnail;
      heroImage.alt = meal.name;
    }

    const heroTitle = mealDetailsSection.querySelector(".absolute.bottom-0 h1");
    if (heroTitle) {
      heroTitle.innerHTML = meal.name;
    }

    // Update badges (category, area, type)
    const badgesContainer = mealDetailsSection.querySelector(".absolute.bottom-0 .flex.items-center.gap-3.mb-3");
    if (badgesContainer) {
      let badgesHTML = `
        <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
        <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
      `;
      if (meal.tags && meal.tags.length > 0) {
        badgesHTML += `<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${meal.tags[0]}</span>`;
      }
      badgesContainer.innerHTML = badgesHTML;
    }

    // Update ingredients list - find the ingredients section
    const ingredientsSections = mealDetailsSection.querySelectorAll(".bg-white.rounded-2xl.shadow-lg.p-6");
    let ingredientsSection = null;
    for (let section of ingredientsSections) {
      if (section.querySelector("h2") && section.querySelector("h2").innerHTML.includes("Ingredients")) {
        ingredientsSection = section;
        break;
      }
    }

    if (ingredientsSection) {
      const ingredientsContainer = ingredientsSection.querySelector(".grid.grid-cols-1.md\\:grid-cols-2");
      let ingredientsHTML = ``;
      if (meal.ingredients && meal.ingredients.length > 0) {
        for (let ingredient of meal.ingredients) {
          ingredientsHTML += `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
              <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
              <span class="text-gray-700">
                <span class="font-medium text-gray-900">${ingredient.measure}</span> ${ingredient.ingredient}
              </span>
            </div>
          `;
        }
      }
      if (ingredientsContainer) {
        ingredientsContainer.innerHTML = ingredientsHTML;
      }

      // Update ingredients count
      const ingredientsCount = ingredientsSection.querySelector(".text-sm.font-normal.text-gray-500");
      if (ingredientsCount) {
        ingredientsCount.innerHTML = `${meal.ingredients ? meal.ingredients.length : 0} items`;
      }
    }

    // Update instructions - find the instructions section
    let instructionsSection = null;
    for (let section of ingredientsSections) {
      if (section.querySelector("h2") && section.querySelector("h2").innerHTML.includes("Instructions")) {
        instructionsSection = section;
        break;
      }
    }

    if (instructionsSection) {
      const instructionsContainer = instructionsSection.querySelector(".space-y-4");
      let instructionsHTML = ``;

      if (meal.instructions && meal.instructions.length > 0) {
        for (let i = 0; i < meal.instructions.length; i++) {
          instructionsHTML += `
            <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                ${i + 1}
              </div>
              <p class="text-gray-700 leading-relaxed pt-2">
                ${meal.instructions[i]}
              </p>
            </div>
          `;
        }
      }
      if (instructionsContainer) {
        instructionsContainer.innerHTML = instructionsHTML;
      }

      // Update instructions count
      const instructionsCount = instructionsSection.querySelector(".text-sm.font-normal.text-gray-500");
      if (instructionsCount) {
        instructionsCount.innerHTML = `${meal.instructions ? meal.instructions.length : 0} steps`;
      }
    }

    // Update video if available
    if (meal.youtube) {
      const videoSection = mealDetailsSection.querySelector(".relative.aspect-video");
      if (videoSection) {
        const videoId = meal.youtube.split("v=")[1];
        const iframe = videoSection.querySelector("iframe");
        if (iframe) {
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
        }
      }
    }

    // Update Log This Meal button with meal ID
    const logMealBtn = mealDetailsSection.querySelector("#log-meal-btn");
    if (logMealBtn) {
      logMealBtn.setAttribute("data-meal-id", mealId);
    }

    // Store current meal for logging
    window.currentMeal = meal;

  } catch (error) {
  }
}

function AttachRecipeCardListeners() {
  const recipeCards = document.querySelectorAll(".recipe-card");
  recipeCards.forEach(card => {
    card.addEventListener("click", function () {
      const mealId = this.getAttribute("data-meal-id");
      DisplayRecipeDetails(mealId);
    });
  });
}

function AttachBackButtonListener() {
  const backBtn = document.getElementById("back-to-meals-btn");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      const searchFiltersSection = document.getElementById("search-filters-section");
      const mealCategoriesSection = document.getElementById("meal-categories-section");
      const allRecipesSection = document.getElementById("all-recipes-section");
      const mealDetailsSection = document.getElementById("meal-details");

      mealDetailsSection.classList.add("hidden");
      searchFiltersSection.classList.remove("hidden");
      mealCategoriesSection.classList.remove("hidden");
      allRecipesSection.classList.remove("hidden");
    });
  }
}

function AttachLogMealButtonListener() {
  const logMealBtn = document.getElementById("log-meal-btn");
  if (logMealBtn) {
    logMealBtn.addEventListener("click", function () {
      if (window.currentMeal) {
        loggedMeals.push(window.currentMeal);
        alert(`"${window.currentMeal.name}" has been added to your food log!`);
      }
    });
  }
}

// Filter state
let currentFilters = {
  keyword: "",
  category: "",
  area: ""
};

// Cache for all meals data
let allMealsCache = [];

// Product scanner state
let productFilters = {
  searchTerm: "",
  barcode: "",
  category: "",
  nutriScore: ""
};

let allProductsCache = [];
let filteredProductsCache = [];

async function ApplyFilters() {
  let mealsToDisplay = [];

  // If we have a search keyword, filter locally
  if (currentFilters.keyword) {
    const searchTerm = currentFilters.keyword.toLowerCase();
    mealsToDisplay = allMealsCache.filter(meal => {
      // Match name
      const nameMatch = meal.name.toLowerCase().includes(searchTerm);

      // Match area (cuisine)
      const areaMatch = meal.area.toLowerCase().includes(searchTerm);

      // Match ingredients
      let ingredientMatch = false;
      if (meal.ingredients && Array.isArray(meal.ingredients)) {
        ingredientMatch = meal.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        );
      }

      return nameMatch || areaMatch || ingredientMatch;
    });
  } else {
    mealsToDisplay = [...allMealsCache];
  }

  // Apply category filter
  if (currentFilters.category) {
    mealsToDisplay = mealsToDisplay.filter(meal =>
      meal.category === currentFilters.category
    );
  }

  // Apply area filter
  if (currentFilters.area) {
    mealsToDisplay = mealsToDisplay.filter(meal =>
      meal.area === currentFilters.area
    );
  }

  DisplayMeals(mealsToDisplay);
}

function DisplayMeals(meals) {
  let cartona = ``;

  if (meals.length === 0) {
    recipesGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fa-solid fa-search text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No recipes found</p>
        <p class="text-sm">Try adjusting your filters</p>
      </div>
    `;
    return;
  }

  for (let i = 0; i < meals.length; i++) {
    cartona += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meals[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meals[i].thumbnail}"
                  alt="${meals[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meals[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meals[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meals[i].instructions ? meals[i].instructions[0] : "Delicious recipe to try!"}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meals[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meals[i].area}
                  </span>
                </div>
              </div>
            </div>
    `
  }
  recipesGrid.innerHTML = cartona;
  AttachRecipeCardListeners();

  // Update recipes count
  const recipesCount = document.getElementById("recipes-count");
  if (recipesCount) {
    recipesCount.innerHTML = `Showing ${meals.length} recipes`;
  }
}

function AttachSearchListener() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentFilters.keyword = this.value;
        ApplyFilters();
      }, 300); // 300ms debounce delay
    });
  }
}

function AttachAreaButtonListeners() {
  const areaButtons = document.querySelectorAll("#areas-container button");
  areaButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove active state from all buttons
      areaButtons.forEach(btn => {
        btn.classList.remove("bg-emerald-600", "text-white");
        btn.classList.add("bg-gray-100", "text-gray-700");
      });

      // Add active state to clicked button
      this.classList.remove("bg-gray-100", "text-gray-700");
      this.classList.add("bg-emerald-600", "text-white");

      // Update filter based on button text
      const buttonText = this.textContent.trim();
      if (buttonText === "All Recipes") {
        currentFilters.area = "";
      } else {
        currentFilters.area = buttonText;
      }

      ApplyFilters();
    });
  });
}

function AttachCategoryCardListeners() {
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach(card => {
    card.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      currentFilters.category = category;
      ApplyFilters();
    });
  });
}

function AttachViewToggleListeners() {
  const gridViewBtn = document.getElementById("grid-view-btn");
  const listViewBtn = document.getElementById("list-view-btn");

  if (gridViewBtn) {
    gridViewBtn.addEventListener("click", function () {
      // Set grid view (4 columns)
      recipesGrid.classList.remove("grid-cols-2");
      recipesGrid.classList.add("grid-cols-4");

      // Update button styles
      gridViewBtn.classList.add("bg-white", "shadow-sm");
      gridViewBtn.classList.remove("text-gray-500");
      gridViewBtn.querySelector("i").classList.add("text-gray-700");
      gridViewBtn.querySelector("i").classList.remove("text-gray-500");

      listViewBtn.classList.remove("bg-white", "shadow-sm");
      listViewBtn.classList.add("text-gray-500");
      listViewBtn.querySelector("i").classList.remove("text-gray-700");
      listViewBtn.querySelector("i").classList.add("text-gray-500");
    });
  }

  if (listViewBtn) {
    listViewBtn.addEventListener("click", function () {
      // Set list view (2 columns)
      recipesGrid.classList.remove("grid-cols-4");
      recipesGrid.classList.add("grid-cols-2");

      // Update button styles
      listViewBtn.classList.add("bg-white", "shadow-sm");
      listViewBtn.classList.remove("text-gray-500");
      listViewBtn.querySelector("i").classList.add("text-gray-700");
      listViewBtn.querySelector("i").classList.remove("text-gray-500");

      gridViewBtn.classList.remove("bg-white", "shadow-sm");
      gridViewBtn.classList.add("text-gray-500");
      gridViewBtn.querySelector("i").classList.remove("text-gray-700");
      gridViewBtn.querySelector("i").classList.add("text-gray-500");
    });
  }
}

// ============= PRODUCT SCANNER FUNCTIONS =============

async function DisplayProductCategories() {
  try {
    const response = await productsAPI.FetchAllProductCategories();
    const categories = response.results || [];

    const productCategoriesContainer = document.getElementById("product-categories");
    if (!productCategoriesContainer) return;

    // Clear existing buttons (keep the structure)
    const existingButtons = productCategoriesContainer.querySelectorAll(".product-category-btn");
    existingButtons.forEach(btn => btn.remove());

    // Add category buttons
    categories.forEach(category => {
      const button = document.createElement("button");
      button.className = "product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all";
      button.textContent = category.name;
      button.setAttribute("data-category", category.name.toLowerCase());
      productCategoriesContainer.appendChild(button);
    });

    AttachProductCategoryListeners();
  } catch (error) {
  }
}

async function DisplayProducts(products) {
  if (!productsGrid) return;

  if (!products || products.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i class="fa-solid fa-search text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No products found</p>
        <p class="text-sm">Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }

  let cartona = ``;
  for (let product of products) {
    const nutriScore = product.nutritionGrade ? product.nutritionGrade.toUpperCase() : "N/A";
    const nutriScoreColor = GetNutriScoreColor(product.nutritionGrade);

    // Get nutrition values with fallbacks
    const protein = product.nutrients?.protein || product.protein_per_100g || "-";
    const carbs = product.nutrients?.carbs || product.carbs_per_100g || "-";
    const fat = product.nutrients?.fat || product.fat_per_100g || "-";
    const sugar = product.nutrients?.sugar || product.sugars_per_100g || "-";

    // Fetch nutrition analysis for calories data
    let caloriesTotal = "-";
    let caloriesPer100g = "-";

    try {
      const nutritionData = await nutrientsAPI.FetchNutritionAnalysis(product.name, [product.name]);
      if (nutritionData?.data?.totals?.calories) {
        caloriesTotal = nutritionData.data.totals.calories;
      }
      if (nutritionData?.data?.perServing?.calories) {
        caloriesPer100g = Math.round(nutritionData.data.perServing.calories / 100 * 100);
      }
    } catch (error) {
    }

    // Use fallback to product's energy_kcal_per_100g if available
    const displayCaloriesPer100g = caloriesPer100g !== "-" ? caloriesPer100g : (product.energy_kcal_per_100g || "-");

    cartona += `
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode}">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${product.image || 'https://via.placeholder.com/200'}"
            alt="${product.name}" loading="lazy" />

          <!-- Nutri-Score Badge -->
          <div class="absolute top-2 left-2 ${nutriScoreColor} text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${nutriScore}
          </div>

          <!-- NOVA Badge -->
          ${product.novaGroup ? `
            <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${product.novaGroup}">
              ${product.novaGroup}
            </div>
          ` : ''}
        </div>

        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
            ${product.brand || 'Unknown Brand'}
          </p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            ${product.name}
          </h3>

          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            ${product.quantity ? `<span><i class="fa-solid fa-weight-scale mr-1"></i>${product.quantity}</span>` : ''}
            ${displayCaloriesPer100g !== "-" ? `<span><i class="fa-solid fa-fire mr-1"></i>${displayCaloriesPer100g} kcal/100g</span>` : ''}
          </div>

          <!-- Calories Display -->
          ${caloriesTotal !== "-" ? `
            <div class="mb-3 p-2 bg-amber-50 rounded">
              <p class="text-xs text-amber-700 font-semibold">Total Calories: ${caloriesTotal} kcal</p>
            </div>
          ` : ''}

          <!-- Mini Nutrition -->
          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${protein}${protein !== "-" ? "g" : ""}</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${carbs}${carbs !== "-" ? "g" : ""}</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${fat}${fat !== "-" ? "g" : ""}</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${sugar}${sugar !== "-" ? "g" : ""}</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  productsGrid.innerHTML = cartona;

  // Update products count
  const productsCount = document.getElementById("products-count");
  if (productsCount) {
    productsCount.textContent = `Showing ${products.length} products`;
  }

  // Attach click listeners to product cards
  AttachProductCardListeners(products);
}

async function AttachProductCardListeners(products) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(card => {
    card.addEventListener("click", async function (e) {
      e.stopPropagation();
      const barcode = this.getAttribute("data-barcode");
      const product = products.find(p => p.barcode === barcode);

      if (product) {
        await ShowProductDetailsModal(product);
      }
    });
  });
}

async function ShowProductDetailsModal(product) {
  let nutritionData = null;
  try {
    nutritionData = await nutrientsAPI.FetchNutritionAnalysis(product.name, [product.name]);
  } catch (error) {
  }

  // Build nutrition content
  let nutritionContent = `
    <div class="text-left">
      <h3 class="text-lg font-bold text-gray-900 mb-3">Product Information</h3>
      
      <div class="mb-4 p-3 bg-blue-50 rounded-lg">
        <p class="text-sm"><strong>Brand:</strong> ${product.brand || 'Unknown'}</p>
        <p class="text-sm"><strong>Quantity:</strong> ${product.quantity || '-'}</p>
        <p class="text-sm"><strong>Nutri-Score:</strong> ${product.nutritionGrade?.toUpperCase() || 'N/A'}</p>
        ${product.novaGroup ? `<p class="text-sm"><strong>NOVA Group:</strong> ${product.novaGroup}</p>` : ''}
      </div>

      <h3 class="text-lg font-bold text-gray-900 mb-3 mt-4">Nutrition Facts</h3>
      
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="p-2 bg-emerald-50 rounded">
          <p class="text-xs text-gray-600">Protein</p>
          <p class="text-lg font-bold text-emerald-700">${product.nutrients?.protein || product.protein_per_100g || '-'}g</p>
        </div>
        <div class="p-2 bg-blue-50 rounded">
          <p class="text-xs text-gray-600">Carbs</p>
          <p class="text-lg font-bold text-blue-700">${product.nutrients?.carbs || product.carbs_per_100g || '-'}g</p>
        </div>
        <div class="p-2 bg-purple-50 rounded">
          <p class="text-xs text-gray-600">Fat</p>
          <p class="text-lg font-bold text-purple-700">${product.nutrients?.fat || product.fat_per_100g || '-'}g</p>
        </div>
        <div class="p-2 bg-orange-50 rounded">
          <p class="text-xs text-gray-600">Sugar</p>
          <p class="text-lg font-bold text-orange-700">${product.nutrients?.sugar || product.sugars_per_100g || '-'}g</p>
        </div>
      </div>
  `;

  // Add nutrition API data if available
  if (nutritionData?.data?.totals) {
    nutritionContent += `
      <div class="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <h4 class="font-bold text-gray-900 mb-2">Nutrition Analysis (Total)</h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <p><strong>Calories:</strong> ${nutritionData.data.totals.calories || '-'} kcal</p>
          <p><strong>Protein:</strong> ${nutritionData.data.totals.protein || '-'}g</p>
          <p><strong>Carbs:</strong> ${nutritionData.data.totals.carbs || '-'}g</p>
          <p><strong>Fat:</strong> ${nutritionData.data.totals.fat || '-'}g</p>
          <p><strong>Fiber:</strong> ${nutritionData.data.totals.fiber || '-'}g</p>
          <p><strong>Sugar:</strong> ${nutritionData.data.totals.sugar || '-'}g</p>
          <p><strong>Saturated Fat:</strong> ${nutritionData.data.totals.saturatedFat || '-'}g</p>
          <p><strong>Cholesterol:</strong> ${nutritionData.data.totals.cholesterol || '-'}mg</p>
          <p><strong>Sodium:</strong> ${nutritionData.data.totals.sodium || '-'}mg</p>
        </div>
      </div>
    `;
  }

  if (nutritionData?.data?.perServing) {
    nutritionContent += `
      <div class="mb-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
        <h4 class="font-bold text-gray-900 mb-2">Per Serving</h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <p><strong>Calories:</strong> ${nutritionData.data.perServing.calories || '-'} kcal</p>
          <p><strong>Protein:</strong> ${nutritionData.data.perServing.protein || '-'}g</p>
          <p><strong>Carbs:</strong> ${nutritionData.data.perServing.carbs || '-'}g</p>
          <p><strong>Fat:</strong> ${nutritionData.data.perServing.fat || '-'}g</p>
          <p><strong>Fiber:</strong> ${nutritionData.data.perServing.fiber || '-'}g</p>
          <p><strong>Sugar:</strong> ${nutritionData.data.perServing.sugar || '-'}g</p>
          <p><strong>Saturated Fat:</strong> ${nutritionData.data.perServing.saturatedFat || '-'}g</p>
          <p><strong>Cholesterol:</strong> ${nutritionData.data.perServing.cholesterol || '-'}mg</p>
          <p><strong>Sodium:</strong> ${nutritionData.data.perServing.sodium || '-'}mg</p>
        </div>
      </div>
    `;
  }

  nutritionContent += `</div>`;

  // Show SweetAlert
  Swal.fire({
    title: product.name,
    html: nutritionContent,
    imageUrl: product.image,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: product.name,
    showCancelButton: true,
    confirmButtonColor: "#10b981",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Log this food",
    cancelButtonText: "Close",
    didOpen: (modal) => {
      modal.classList.add("max-w-2xl");
    }
  }).then((result) => {
    if (result.isConfirmed) {
      LogProductToFoodLog(product, nutritionData);
    }
  });
}

function LogProductToFoodLog(product, nutritionData) {
  const loggedItem = {
    type: "product",
    name: product.name,
    brand: product.brand,
    barcode: product.barcode,
    quantity: product.quantity,
    timestamp: new Date(),
    nutrition: {
      protein: product.nutrients?.protein || product.protein_per_100g || 0,
      carbs: product.nutrients?.carbs || product.carbs_per_100g || 0,
      fat: product.nutrients?.fat || product.fat_per_100g || 0,
      sugar: product.nutrients?.sugar || product.sugars_per_100g || 0,
      calories: nutritionData?.data?.perServing?.calories || 0
    }
  };

  loggedMeals.push(loggedItem);

  Swal.fire({
    icon: "success",
    title: "Food Logged!",
    text: `${product.name} has been added to your food log`,
    confirmButtonColor: "#10b981"
  });
}

function GetNutriScoreColor(score) {
  switch (score?.toUpperCase()) {
    case "A":
      return "bg-green-500";
    case "B":
      return "bg-lime-500";
    case "C":
      return "bg-yellow-500";
    case "D":
      return "bg-orange-500";
    case "E":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

async function ApplyProductFilters() {
  let results = [];

  try {
    // If searching by barcode
    if (productFilters.barcode) {
      const response = await productsAPI.FetchProductByBarcode(productFilters.barcode);
      results = response.result ? [response.result] : [];
    }
    // If searching by product name
    else if (productFilters.searchTerm) {
      const response = await productsAPI.FetchProductsBySearch(productFilters.searchTerm, 1, 24);
      results = response.results || [];
    }
    // If filtering by category
    else if (productFilters.category) {
      const response = await productsAPI.FetchProductsByCategory(productFilters.category);
      results = response.results || [];
    }

    // Apply nutri-score filter
    if (productFilters.nutriScore && productFilters.nutriScore !== "") {
      results = results.filter(product =>
        product.nutri_score?.toUpperCase() === productFilters.nutriScore.toUpperCase()
      );
    }

    filteredProductsCache = results;

    DisplayProducts(results);
  } catch (error) {
    DisplayProducts([]);
  }
}

function AttachProductSearchListener() {
  const productSearchInput = document.getElementById("product-search-input");
  const searchProductBtn = document.getElementById("search-product-btn");

  if (productSearchInput) {
    productSearchInput.addEventListener("input", function () {
      productFilters.searchTerm = this.value;
      productFilters.barcode = "";
      if (this.value.length === 0) {
        productsGrid.innerHTML = `
          <div class="col-span-full text-center py-12 text-gray-500">
            <i class="fa-solid fa-search text-4xl mb-3 text-gray-300"></i>
            <p class="font-medium">Search for products</p>
          </div>
        `;
      } else {
        ApplyProductFilters();
      }
    });
  }

  if (searchProductBtn) {
    searchProductBtn.addEventListener("click", function () {
      ApplyProductFilters();
    });
  }
}

function AttachBarcodeSearchListener() {
  const barcodeInput = document.getElementById("barcode-input");
  const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");

  if (lookupBarcodeBtn) {
    lookupBarcodeBtn.addEventListener("click", function () {
      const barcode = barcodeInput?.value.trim();
      if (barcode) {
        productFilters.barcode = barcode;
        productFilters.searchTerm = "";
        ApplyProductFilters();
      }
    });
  }

  if (barcodeInput) {
    barcodeInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        lookupBarcodeBtn?.click();
      }
    });
  }
}

function AttachNutriScoreFilterListeners() {
  const nutriScoreButtons = document.querySelectorAll(".nutri-score-filter");
  nutriScoreButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove active state from all buttons
      nutriScoreButtons.forEach(btn => {
        btn.classList.remove("bg-green-500", "bg-lime-500", "bg-yellow-500", "bg-orange-500", "bg-red-500", "text-white");
        btn.classList.add("hover:opacity-80");
      });

      // Add active state to clicked button
      this.classList.remove("hover:opacity-80");
      this.classList.add(this.classList[1]); // Add the color class

      // Update filter
      const grade = this.getAttribute("data-grade");
      productFilters.nutriScore = grade;
      ApplyProductFilters();
    });
  });
}

function AttachProductCategoryListeners() {
  const categoryButtons = document.querySelectorAll(".product-category-btn");
  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      productFilters.category = category;
      productFilters.searchTerm = "";
      productFilters.barcode = "";
      ApplyProductFilters();
    });
  });
}

Navigation();
AttachBackButtonListener();
AttachLogMealButtonListener();
await DisplayAllMeals();
await DisplayAreas();
await DisplayCategories();
await DisplayProductCategories();
AttachSearchListener();
AttachAreaButtonListeners();
AttachCategoryCardListeners();
AttachViewToggleListeners();
AttachProductSearchListener();
AttachBarcodeSearchListener();
AttachNutriScoreFilterListeners();

