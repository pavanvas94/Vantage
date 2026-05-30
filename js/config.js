// ----------------------------------------------------
// Vantage - Global Configuration Constants
// ----------------------------------------------------

window.VANTAGE_CONFIG = {
    // Obfuscated Supabase project keys to prevent bot harvesting on public repositories
    _SU: "aHR0cHM6Ly9tcGV6c2xvcnV0eGprcWZkcGluZy5zdXBhYmFzZS5jbw==",
    _SK: "ZXlKaGJHY2lPaUpJVXpVMU5pSXNObjVjM0FpT2lKSlZsUXlKMTAuZXlKcGNYTWlPaUp6ZFhCaFltRnpZUzF5WldZaU9pSnRjR1Y2YzI1dmNuVjBlSGpyY1daMGFHbHVaM0lpTENKeWJXOXNaU0k2SW1GdVkyNGlMQ0pwWVhRaU9qRTNkemszT0RBMU56a2lMQ0psZUhBaU9qSXdPVFV6TlRVMU56azlmUS5MbERnakVfdHVIOG1IZ2thSklTNlpJLVdnNlJFSGd5QXlsU21LbGhCNjc0",

    get SUPABASE_URL() {
        try { return atob(this._SU); } catch(e) { return ""; }
    },
    get SUPABASE_ANON_KEY() {
        try { return atob(this._SK); } catch(e) { return ""; }
    },

    // Centralized Gemini API Credentials (Optional: set to empty to use mock simulator)
    GEMINI_API_KEY: ""
};
