import { create } from "zustand";

// Tipo de los datos de la API
type ExchangeRatesResponse = {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_utc: string;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: Record<string, number>;
};

// Tipo para el estado del store
type ExchangeStoreState = {
    baseCurrency: string;
    rates: Record<string, number>;
    error: string | null;
    isLoading: boolean;
    fetchRates: (baseCurrency: string) => Promise<void>;
};

// API key y URL base
const API_KEY = "dc16b2204679d92feaa0e25c"; // Reemplaza con tu clave
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const useExchangeStore = create<ExchangeStoreState>((set) => ({
    baseCurrency: "USD",
    rates: {},
    error: null,
    isLoading: false,
    fetchRates: async (baseCurrency: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${BASE_URL}/latest/${baseCurrency}`);
            if (!response.ok) {
                throw new Error(`Error al obtener datos: ${response.status}`);
            }
            const data: ExchangeRatesResponse = await response.json();
            set({
                baseCurrency,
                rates: data.conversion_rates,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: "No se pudo obtener las tasas de cambio.",
                isLoading: false,
            });
            console.error(error);
        }
    },
}));
