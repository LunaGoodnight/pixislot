import { pixiPipes } from '@assetpack/core/pixi';

export default {
    entry: './raw-assets',
    output: './public/assets/',
    // cache: true,
    pipes: [
        ...pixiPipes({
            manifest: {
                createShortcuts: true,
                output: './src/manifest.json',
            },
        }),
    ],
};
