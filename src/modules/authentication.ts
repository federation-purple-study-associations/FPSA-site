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
    },
};