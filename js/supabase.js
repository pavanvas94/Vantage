// ----------------------------------------------------
// Vantage - Supabase Database Client Initializer
// ----------------------------------------------------

/**
 * Initializes the Supabase Client dynamically.
 * If credentials are not present, returns null (triggers local mock mode).
 * @param {string} url - Supabase project URL
 * @param {string} anonKey - Supabase anon key
 * @returns {object|null} supabase client instance or null
 */
export function initSupabase(url, key) {
    if (!url || !key) {
        return null;
    }
    try {
        // 'supabase' is loaded globally in auth.html / app.html via CDN script
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            return supabase.createClient(url, key);
        } else {
            console.warn("Supabase library not loaded. Ensure CDN script is active.");
            return null;
        }
    } catch (e) {
        console.error("Failed to initialize Supabase client:", e);
        return null;
    }
}
