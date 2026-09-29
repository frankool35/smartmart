const CURRENCY_API =
    "https://open.er-api.com/v6/latest/USD";

export async function getExchangeRates() {
    try {
        const response = await fetch(CURRENCY_API);

        if (!response.ok) {
            throw new Error("Unable to load exchange rates.");
        }

        const data = await response.json();

        return data.rates;
    } catch (error) {
        console.error("Currency API error:", error);

        return null;
    }
}