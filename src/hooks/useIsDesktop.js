import { useState, useEffect } from 'react';

export const useIsDesktop = () => {
    // Initialize state (safely check for window to support SSR if needed)
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : true
    );

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    return isDesktop;
};
