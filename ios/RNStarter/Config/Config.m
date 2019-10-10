//
//  ConfigManager.m
//  DrR
//
//  Created by jialing Lee on 2018/5/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "Config.h"
#import "AppDef.h"

@implementation Config

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{
           @"APP_MODE": APP_MODE,
           @"BASE_BACKEND": BASE_BACKEND,
           };
}

@end
