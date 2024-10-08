/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // A blue shade for primary actions
        secondary: '#9333EA', // A purple shade for secondary actions
        background: '#1E293B', // Dark background color
        surface: '#111827', // Darker surface color for cards
        onPrimary: '#FFFFFF', // Text color on primary buttons
        onSecondary: '#FFFFFF', // Text color on secondary buttons
        error: '#DC2626', // Error color
        warning: '#FBBF24', // Warning color
        info: '#3B82F6', // Info color
        success: '#16A34A', // Success color
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
      },
      spacing: {
        '128': '32rem', // Custom spacing size for larger elements
        '144': '36rem', // Another custom spacing size
      },
      borderRadius: {
        '4xl': '2rem', // Extra large border radius
      },
    },
  },
  plugins: [],
}
