import Vue from 'vue';

export default {
    namespace: false,
    getters: {
        hasPermission: (state: any) => (scope: string) => parseJWT().scopes.includes(scope),
    },
    actions: {
        isLoggedIn(): boolean {
            return !!getAuthCookie();
        },

        logout(): void {
            deleteAuthCookie();
        },
    },
};

function parseJWT() {
    return JSON.parse(atob(getAuthCookie().split('.')[1]));
}

const getAuthCookie = () => Vue.$cookies.get('auth');
const deleteAuthCookie = () => Vue.$cookies.remove('auth');
