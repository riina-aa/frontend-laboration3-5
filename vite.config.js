import { defineConfig } from "vite";
import { resolve } from "path"; 
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import {CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement} from 'chart.js';
import {Canvas} from 'skia-canvas';
import fsp from 'node:fs/promises';


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"), 
                valuation: resolve(__dirname, "valuation.html"),
                animation: resolve(__dirname, "animation.html"),
                diagram: resolve(__dirname, "diagram.html"), 
                map: resolve(__dirname, "map.html") 
            }
        }
    },
    css: {
        devSourcemap: true 
    }, 
     
})

