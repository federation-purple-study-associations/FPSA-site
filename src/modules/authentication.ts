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
            const sDomain = process.env.VUE_APP_COOKIE_DOMAIN;
            document.cookie = 'auth=; domain=' + sDomain  + ': expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
    },
};

function parseJWT() {
    return JSON.parse(atob(getAuthCookie().split('.')[1]));
}

function getAuthCookie() {
    const list: any = {};
    document.cookie.split(';').forEach((cookie) => {
        const parts = cookie.split('=');
        const key = parts.shift();
        if (key !== undefined) {
            list[key.trim()] = decodeURI(parts.join('='));
        }
    });

    return list.auth;
}
