/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#0A0A0F',
                purple: {
                    400: '#A78BFA',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                    700: '#6D28D9',
                },
                cyan: {
                    400: '#22D3EE',
                    500: '#06B6D4',
                    600: '#0891B2',
                },
                amber: {
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-hero': 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 1.5s infinite',
                'first': 'moveVertical 30s ease infinite',
                'second': 'moveInCircle 20s reverse infinite',
                'third': 'moveInCircle 40s linear infinite',
                'fourth': 'moveHorizontal 40s ease infinite',
                'fifth': 'moveInCircle 20s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #7C3AED, 0 0 10px #7C3AED' },
                    '100%': { boxShadow: '0 0 20px #7C3AED, 0 0 40px #06B6D4' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                moveHorizontal: {
                    '0%': { transform: 'translateX(-50%) translateY(-10%)' },
                    '50%': { transform: 'translateX(50%) translateY(10%)' },
                    '100%': { transform: 'translateX(-50%) translateY(-10%)' },
                },
                moveInCircle: {
                    '0%': { transform: 'rotate(0deg)' },
                    '50%': { transform: 'rotate(180deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                moveVertical: {
                    '0%': { transform: 'translateY(-50%)' },
                    '50%': { transform: 'translateY(50%)' },
                    '100%': { transform: 'translateY(-50%)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};
