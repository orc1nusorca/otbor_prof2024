import { api } from '../utils/api';
import { API_ROUTES } from '../constants/apiConstants';

export const authService = {
    async register(userData) {
        return api.post(API_ROUTES.REGISTER, userData);
    },

    async login(credentials) {
        return api.post(API_ROUTES.LOGIN, credentials);
    },
};
