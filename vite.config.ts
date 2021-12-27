import { defineConfig } from "vite";
import type { ConfigEnv } from 'vite';
import vue from "@vitejs/plugin-vue";
import visualizer from "rollup-plugin-visualizer";
import { vitePluginCommonjs } from 'vite-plugin-commonjs'
import path from "path";

export default defineConfig(({ command }: ConfigEnv) => {
  console.log(command);
  const { analyzer } = process.env;
  let _plugins = [vue(), vitePluginCommonjs()];

  if (analyzer) {
    const _analyzerPlugin = visualizer({
      filename: 'analyzer.html',
      projectRoot: '/analyzer',
      open: true,
      gzipSize: true,
      brotliSize: true
    });

    _plugins = _plugins.concat([_analyzerPlugin]);
  }

  return {
    base: "./",
    // 开发环境
    server: {
      host: "0.0.0.0",
      port: 8088,
      proxy: {
        "^/api/": {
          target: "http://localhost:3000/",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/interface/, "")
        }
      }
    },
    // 打包后预览
    preview: {
      host: "0.0.0.0",
      port: 8089,
      proxy: {
        "^/api/": {
          target: "http://localhost:3000/",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/interface/, "")
        }
      }
    },
    plugins: _plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/globalVariable.scss";'
        }
      }
    },
    build: {
      sourcemap: false,
      outDir: 'dist', // 指定输出路径，要和库的包区分开
      assetsDir: 'static/', // 指定生成静态资源的存放路径
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html")
        },
        output: {
          chunkFileNames: 'static/js1/[name]-[hash].js',
          entryFileNames: 'static/js2/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
        brotliSize: false, // 不统计
        target: 'esnext',
        minify: 'esbuild' // 混淆器，terser构建后文件体积更小
      }
    }
  };
});
