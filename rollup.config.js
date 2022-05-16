import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'lib/tree.prod.js',
            format: 'cjs',
            exports: 'auto',
            plugins: [
                terser()
            ]
        },
        {
            file: 'lib/tree.js',
            format: 'cjs',
            exports: 'auto',
        }
    ],
    plugins: [
        typescript({
            rollupCommonJSResolveHack: false,
            clean: true,
        })
    ]
};