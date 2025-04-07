import { api } from '../utils/api';
import { API_ROUTES } from '../constants/apiConstants';
import { authHeader } from '../utils/authHeader';

export const fileService = {
    async getUserFiles() {
        return api.get(API_ROUTES.USER_FILES, { headers: authHeader() });
    },

    async getSharedFiles() {
        return api.get(API_ROUTES.SHARED_FILES, { headers: authHeader() });
    },
    async deleteFile(fileId) {
        return api.delete(`${API_ROUTES.FILES}/${fileId}`, { headers: authHeader() });
    },
    async downloadFile(fileId) {
        return api.get(`${API_ROUTES.FILES}/${fileId}/download`, { headers: authHeader(), responseType: 'blob' });
    },
    async updateFile(fileId, name) {
        return api.put(`${API_ROUTES.FILES}/${fileId}`, { name }, { headers: authHeader() });
    },
    async uploadFiles(files) {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        return api.post(API_ROUTES.UPLOAD, formData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
    },
    async addPermission(fileId, userEmail) {
        return api.post(`${API_ROUTES.FILES}/${fileId}/permissions`, { email: userEmail }, { headers: authHeader() });
    },
    async deletePermission(fileId, userEmail) {
        return api.delete(`${API_ROUTES.FILES}/${fileId}/permissions`, { headers: authHeader(), data: { email: userEmail } });
    },
    async getPermissions(fileId) {
        return api.get(`${API_ROUTES.FILES}/${fileId}/permissions`, { headers: authHeader() });
    },
}
