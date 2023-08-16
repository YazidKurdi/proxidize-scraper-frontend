import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // Import the path module

// Add this function to generate the alias
function pathResolve(dir) {
  return path.resolve(__dirname, '.', dir);
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('src'), // This creates an alias for the "src" directory
    },
  },
});
