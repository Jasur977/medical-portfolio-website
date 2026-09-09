import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_TIMEOUT_MINUTES = 15;
const DEFAULT_WARNING_SECONDS = 60;

export function useAdminSession({
    isAdmin,
    onLogout,
    timeoutMinutes = DEFAULT_TIMEOUT_MINUTES,
    warningSeconds = DEFAULT_WARNING_SECONDS
}) {
    const timeoutMs = timeoutMinutes * 60 * 1000;
    const [remainingSeconds, setRemainingSeconds] = useState(timeoutMinutes * 60);
    const [showWarning, setShowWarning] = useState(false);
    const lastUpdateRef = useRef(0);

    const extendSession = useCallback(() => {
        const now = Date.now();
        localStorage.setItem('admin_last_activity', now.toString());
        setRemainingSeconds(timeoutMinutes * 60);
        setShowWarning(false);
    }, [timeoutMinutes]);

    // Record user activity (throttled to at most once every 5 seconds)
    const recordActivity = useCallback(() => {
        if (!isAdmin) return;
        const now = Date.now();
        if (now - lastUpdateRef.current > 5000) {
            lastUpdateRef.current = now;
            localStorage.setItem('admin_last_activity', now.toString());
        }
    }, [isAdmin]);

    // Track user interactions
    useEffect(() => {
        if (!isAdmin) {
            setShowWarning(false);
            return;
        }

        // Initialize activity timestamp if not already set
        if (!localStorage.getItem('admin_last_activity')) {
            localStorage.setItem('admin_last_activity', Date.now().toString());
        }

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        events.forEach(evt => window.addEventListener(evt, recordActivity, { passive: true }));

        // Also listen to cross-tab storage changes
        const handleStorage = (e) => {
            if (e.key === 'admin_last_activity' && e.newValue) {
                const elapsed = Date.now() - parseInt(e.newValue, 10);
                const remaining = Math.max(0, Math.floor((timeoutMs - elapsed) / 1000));
                setRemainingSeconds(remaining);
                if (remaining > warningSeconds) {
                    setShowWarning(false);
                }
            } else if (e.key === 'token' && !e.newValue) {
                // Token removed in another tab
                if (onLogout) onLogout();
            }
        };
        window.addEventListener('storage', handleStorage);

        return () => {
            events.forEach(evt => window.removeEventListener(evt, recordActivity));
            window.removeEventListener('storage', handleStorage);
        };
    }, [isAdmin, recordActivity, timeoutMs, warningSeconds, onLogout]);

    // 1-second interval ticker to compute countdown
    useEffect(() => {
        if (!isAdmin) return;

        const interval = setInterval(() => {
            const rawLast = localStorage.getItem('admin_last_activity');
            const lastActivity = rawLast ? parseInt(rawLast, 10) : Date.now();
            const elapsed = Date.now() - lastActivity;
            const remaining = Math.max(0, Math.floor((timeoutMs - elapsed) / 1000));

            setRemainingSeconds(remaining);

            if (remaining <= warningSeconds && remaining > 0) {
                setShowWarning(true);
            } else if (remaining > warningSeconds) {
                setShowWarning(false);
            }

            if (remaining === 0) {
                clearInterval(interval);
                setShowWarning(false);
                if (onLogout) {
                    onLogout();
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isAdmin, timeoutMs, warningSeconds, onLogout]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return {
        remainingSeconds,
        formattedTime,
        showWarning,
        extendSession
    };
}
