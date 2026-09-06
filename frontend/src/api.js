// Dynamically determine the backend API URL:
// In Docker / production (port 80/443), use relative '/api' proxied by Nginx.
// In local Vite dev (port 5173/3000), target the exposed backend at port 8081.
const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        const port = window.location.port;
        if (port === '5173' || port === '3000') {
            return 'http://localhost:8081/api';
        }
    }
    return import.meta.env.VITE_API_URL || '/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        
        const data = await response.json();
        // Save the token to local storage
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const fetchHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.text();
    } catch (error) {
        console.error('Error fetching health status:', error);
        throw error;
    }
};

export const searchEverything = async (query) => {
    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
};

// --- Profile API functions ---
export const fetchProfiles = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/profiles`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

export const updateProfile = async (id, profileData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(profileData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// --- Clinical Cases API functions ---
export const fetchClinicalCases = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cases`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching clinical cases:', error);
        throw error;
    }
};

export const createClinicalCase = async (caseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(caseData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating clinical case:', error);
        throw error;
    }
};

export const updateClinicalCase = async (id, caseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cases/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(caseData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating clinical case:', error);
        throw error;
    }
};

export const deleteClinicalCase = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cases/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders()
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok && response.status !== 204) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting clinical case:', error);
        throw error;
    }
};

// --- General Upload APIs ---
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE_URL}/upload/image`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders()
            },
            body: formData,
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Image upload failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE_URL}/upload/video`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders()
            },
            body: formData,
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Video upload failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};

// --- Course API functions ---
export const fetchCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(courseData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

export const updateCourse = async (id, courseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(courseData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders()
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok && response.status !== 204) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};

// --- Lesson API functions ---
export const createLesson = async (lessonData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(lessonData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating lesson:', error);
        throw error;
    }
};

export const updateLesson = async (id, lessonData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(lessonData)
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating lesson:', error);
        throw error;
    }
};

export const deleteLesson = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders()
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error('Unauthorized. Please log in again.');
        }
        
        if (!response.ok && response.status !== 204) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting lesson:', error);
        throw error;
    }
};