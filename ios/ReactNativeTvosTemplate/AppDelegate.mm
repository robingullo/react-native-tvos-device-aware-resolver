#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ReactNativeTvosTemplate";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  RCTBundleURLProvider *bundleUrlProvider = [RCTBundleURLProvider sharedSettings];
  NSString *packagerServerHostPort = [bundleUrlProvider packagerServerHostPort];
  if (!packagerServerHostPort) {
    return [bundleUrlProvider jsBundleURLForFallbackExtension:nil];
  } else {
    Boolean isTv = [[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomTV;
    NSDictionary *additionalOptions =  isTv ? @{ @"resolver.isTv" : @"true" } : nil;
    
    return [RCTBundleURLProvider jsBundleURLForBundleRoot:@"index"
                                             packagerHost:packagerServerHostPort
                                           packagerScheme:[bundleUrlProvider packagerScheme]
                                                enableDev:[bundleUrlProvider enableDev]
                                       enableMinification:[bundleUrlProvider enableMinification]
                                          inlineSourceMap:[bundleUrlProvider inlineSourceMap]
                                              modulesOnly:NO
                                                runModule:YES
                                        additionalOptions:additionalOptions];
  }
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
