# Apni Property

A simple Android-first starter for a property marketplace focused initially on Gorakhpur Mandal.

## Current V1
- Hindi/English switch
- Home
- Search/filter demo properties
- Direct owner property listing form
- Gata / Khata / Khatauni fields
- Dealer/owner labels
- Buyer requirement placeholder
- Local/demo data
- EAS APK/AAB configuration

## Run
Install Node.js, then:
npm install
npx expo start

For easiest phone testing, install Expo Go and scan the QR code shown by Expo.

## APK
After the project runs correctly:
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview

The preview profile creates an APK.

## Important
V1 intentionally uses local/demo data. Firebase, Google Maps, notifications and authorized government land-record integrations should be connected later. Never put API keys directly in source code.
