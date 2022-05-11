import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/tree.js',
        format: 'cjs',
        exports: 'auto'
    },
    plugins: [
        typescript()
    ]
};