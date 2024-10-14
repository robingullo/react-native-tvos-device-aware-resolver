const {withMainApplication} = require('@expo/config-plugins');

// Function to modify MainApplication.kt and update key-value pairs conditionally for TV devices
function modifyMainApplication(contents, options) {
  const needle = 'super.onCreate();'; // Line where we want to add the new code

  // Add a check for TV devices using UiModeManager
  const tvCheckCode = `
    val uiModeManager = getSystemService(UI_MODE_SERVICE) as android.app.UiModeManager
    val isTv = uiModeManager.currentModeType == android.content.res.Configuration.UI_MODE_TYPE_TELEVISION
    if (isTv) {
  `;

  const tvCheckEnd = '\n    }';

  // Split the contents of MainApplication.kt by line for easier manipulation
  const lines = contents.split('\n');

  // Filter out any previous setAdditionalOptionForPackager calls
  const cleanedLines = lines.filter(
    line =>
      !line.includes(
        'reactHost.devSupportManager?.devSettings?.packagerConnectionSettings?.setAdditionalOptionForPackager',
      ),
  );

  // Construct the new options dynamically based on the object passed
  const additions = Object.entries(options).map(
    ([key, value]) =>
      `reactHost.devSupportManager?.devSettings?.packagerConnectionSettings?.setAdditionalOptionForPackager("${key}", "${value}");`,
  );

  // Find the index of the 'super.onCreate();' line to insert after it
  const onCreateIndex = cleanedLines.findIndex(line => line.includes(needle));

  // If 'super.onCreate();' is found, insert the new additions after it
  if (onCreateIndex !== -1) {
    cleanedLines.splice(
      onCreateIndex + 1,
      0,
      tvCheckCode,
      ...additions,
      tvCheckEnd,
    );
  }

  // Join the lines back into the final content
  return cleanedLines.join('\n');
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
