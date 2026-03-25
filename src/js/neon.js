// Highly Capable Neon Client
import { NEON_API_URL } from './config.js';

class NeonClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    async request(path, options = {}) {
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

        const response = await fetch(`${this.baseURL}${path}`, { ...options, headers });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'API Error' }));
            return { data: null, error };
        }
        const data = await response.json();
        return { data, error: null };
    }

    from(table) {
        return {
            select: (query = '*') => ({
                id: async (id) => this.request(`/${table}?id=eq.${id}`),
                eq: async (col, val) => this.request(`/${table}?${col}=eq.${val}`),
                then: (cb) => this.request(`/${table}`).then(cb)
            }),
            insert: async (payload) => this.request(`/${table}`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Prefer': 'return=representation' }
            }),
            update: async (payload, id) => this.request(`/${table}?id=eq.${id}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: { 'Prefer': 'return=representation' }
            }),
            delete: async (id) => this.request(`/${table}?id=eq.${id}`, { method: 'DELETE' })
        };
    }
}

export const neon = new NeonClient(NEON_API_URL);
