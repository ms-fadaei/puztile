import path from 'path'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'

export default {
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    Unocss({
      shortcuts: [
        ['normal-bg', 'p-2 rounded-2 bg-slate-200 dark:bg-slate-800'],
        [
          'btn',
          'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
        [
          'icon-btn',
          'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
        ],
        ['wrapper', 'relative overflow-x-auto max-w-full grid gap-1'],
        [
          'tile',
          'w-10 h-10 rounded-md bg-blue-gray-300 text-blue-gray-800 dark:bg-blue-gray-700 dark:text-blue-gray-50 block select-none',
        ],
        [
          'button',
          'py-2 px-5 rounded-md bg-blue-gray-300 hover:bg-blue-gray-200 text-blue-gray-800 dark:bg-blue-gray-600 dark:hover:bg-blue-gray-700 dark:text-blue-gray-50 disabled:opacity-50',
        ],
        [
          'switch-button',
          'block rounded-md text-sm py-1 px-2 transparent text-blue-gray-800 dark:text-blue-gray-50 cursor-pointer',
        ],
        [
          'won',
          'inset-0 absolute bg-slate-200/60 dark:bg-slate-800/60 flex justify-center items-center font-bold text-emerald-600 dark:text-emerald-400 text-xl',
        ],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}
