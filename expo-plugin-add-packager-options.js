const {withMainApplication} = require('@expo/config-plugins');

// Function to modify MainApplication.kt and add key-value pairs
function modifyMainApplication(contents, options) {
  const needle = 'super.onCreate()'; // Line where we want to add the new code

  // Construct the additional options dynamically based on the object passed
  const additions = Object.entries(options).map(
    ([key, value]) =>
      `reactHost.devSupportManager?.devSettings?.packagerConnectionSettings?.setAdditionalOptionForPackager("${key}", "${value}");`,
  );

  // Ensure no duplicate additions
  const newAdditions = additions.filter(
    addition => !contents.includes(addition),
  );

  // If all the lines are already present, return unchanged contents
  if (newAdditions.length === 0) {
    return contents;
  }

  // Insert new non-duplicated lines after 'super.onCreate();'
  const additionsString = newAdditions.join('\n    ');
  return contents.replace(needle, `${needle}\n    ${additionsString}`);
}

// Expo config plugin
const withPackagerOptions = (config, options = {}) => {
  return withMainApplication(config, config => {
    config.modResults.contents = modifyMainApplication(
      config.modResults.contents,
      options,
    );
    return config;
  });
};

module.exports = withPackagerOptions;
