import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ga.cervisebas.scmanga',
  appName: 'SCManga',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#FFFFFF',
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: true,
      androidScaleType: 'CENTER_CROP',
      androidSpinnerStyle: 'large'
    },
    LocalNotifications: {
      smallIcon: "icon_notification",
      iconColor: "#FF5733"
    }
  }
};

export default config;
