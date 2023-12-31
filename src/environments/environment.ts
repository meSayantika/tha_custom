// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url : "https://customapi.shoplocal-lagunabeach.com",
  // api_url:'http://192.168.1.244:3000',
  // api_url:'http://192.168.1.244:3001/admin/ordersetup',
  menuUrl:'./assets/adminMenuConfig.json',
  timezoneUrl:'./assets/timeZone.json',
  langUrl:'./assets/languages.json',
  menuSetup:'./assets/menuSetupSidebar.json',
  // Redirect_url:'http://localhost:4200/user/user_menu/',
 Redirect_url:'https://custom.shoplocal-lagunabeach.com/#//user/user_menu/',
  approvedMenu:'./assets/approvedSidebar.json',
  routeUrl:'http://localhost:4200/#/',
  // routeUrl:'https://custom.shoplocal-lagunabeach.com/#/',
  socketUrl: '' ,
  flipUrl:'https://flipbook.shoplocal-lagunabeach.com/#',
  funURl:'https://fun.shoplocal-lagunabeach.com/',
  // DirURL:'https://dir.shoplocal-lagunabeach.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
