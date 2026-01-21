const NUTRITION_API_KEY = "oHvjZwK6EB1UGh2a6iSNK1AcwewlL15ahV1eX0dT";

export async function FetchNutritionAnalysis(recipeName, ingredients) {
    try {
        const response = await fetch(
            "https://nutriplan-api.vercel.app/api/nutrition/analyze",
            {
                method: "POST",
                headers: {
                    "x-api-key": NUTRITION_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    recipeName: recipeName,
                    ingredients: ingredients
                })
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching nutrition analysis:", error);
        return null;
    }
}
