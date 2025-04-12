import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react({
        include: '**/*.{jsx,tsx}', // Add this line
    })],
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'ReactComponentLibrary',
            fileName: (format) => `react-component-library.${format}.js`,
            formats: ['es']
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        },
        cssCodeSplit: false
    }
});