export default {
    namespace: false,
    actions: {
        isLoggedIn(): boolean {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const list: any = {};
            document.cookie.split(';').forEach((cookie) => {
                const parts = cookie.split('=');
                const key = parts.shift();
                if (key !== undefined) {
                    list[key.trim()] = decodeURI(parts.join('='));
                }
            });

            return !!list.auth;
        },

        logout(): void {
            document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    },
};