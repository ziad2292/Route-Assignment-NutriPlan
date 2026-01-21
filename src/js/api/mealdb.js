export async function FetchMealsFilterByKeyword(keyword = "") {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${keyword}&page=1&limit=25`
  );

  const data = await response.json();
  return data;
}

export async function FetchMealsFilters(
  category = "",
  area = "",
  ingredient = ""
) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&area=${area}&ingredient=${ingredient}&page=1&limit=25`
  );

  const data = await response.json();
  return data;
}

export async function FetchMealById(id) {
  const response = await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`);

  const data = await response.json();
  return data;
}

export async function FetchRandomMeals(count) {
  const response = await 
    fetch(`https://nutriplan-api.vercel.app/api/meals/random?count=${count}
`);

  const data = await response.json();
  return data;
}

export async function FetchAllCategories() {
  const response = await fetch(`https://nutriplan-api.vercel.app/api/meals/categories
`);

  const data = await response.json();
  return data;
}

export async function FetchAllAreas() {
  const response = await fetch(`https://nutriplan-api.vercel.app/api/meals/areas
`);

  const data = await response.json();
  return data;
}
