const API = {

    register: async (data) => {
        return fetch('/api/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    },


    login: async (data) => {
        return fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    },


    refreshToken: async (refresh) => {
        return fetch('/api/auth/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refresh,
            }),
        })
    },


    getProfile: async () => {
        return fetch('/api/auth/profile/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },


    updateProfile: async (data) => {
        return fetch('/api/auth/profile/update/', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: data,
        })
    },


    getPosts: async () => {
        return fetch('/api/posts/', {
            method: 'GET',
        })
    },


    createPost: async (data) => {
        return fetch('/api/posts/create/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: data,
        })
    },


    getMyPosts: async () => {
        return fetch('/api/posts/my/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },


    getPost: async (id) => {
        return fetch(`/api/posts/${id}/`, {
            method: 'GET',
        })
    },


    updatePost: async (id, data) => {
        return fetch(`/api/posts/${id}/update/`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: data,
        })
    },


    deletePost: async (id) => {
        return fetch(`/api/posts/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },


    toggleLike: async (id) => {
        return fetch(`/api/posts/${id}/like/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },


    resolvePost: async (id) => {
        return fetch(`/api/posts/${id}/resolve/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },


    getGovernmentPosts: async () => {
        return fetch('/api/government/posts/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },


    cleanupGovernmentPost: async (id) => {
        return fetch(`/api/government/posts/${id}/cleanup/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
    },

}

export default API