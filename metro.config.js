const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

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
      const sourceExts = isTv
        ? [...context.sourceExts.map(ext => `tv.${ext}`), ...context.sourceExts]
        : context.sourceExts;
      return context.resolveRequest(
        {...context, sourceExts},
        moduleName,
        platform,
      );
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
