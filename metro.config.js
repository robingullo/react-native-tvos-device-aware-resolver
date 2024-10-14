const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const originalSourceExts = getDefaultConfig(__dirname).resolver.sourceExts;
const tvSourceExts = [
  ...originalSourceExts.map(e => `tv.${e}`),
  ...originalSourceExts,
];

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      const isTv = context.customResolverOptions.isTv === 'true';

      return context.resolveRequest(
        isTv ? {...context, sourceExts: tvSourceExts} : context,
        moduleName,
        platform,
      );
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
