# Cordova with React app

- No reco cli
- Following [this tutorial](https://blog.devgenius.io/convert-your-react-application-to-an-andriod-ios-app-using-cordova-87646729c2b7)

## Requirements to build apk

- Setup gradle: https://linuxize.com/post/how-to-install-gradle-on-ubuntu-20-04/
- Setup Android SDK without android studio: https://proandroiddev.com/how-to-setup-android-sdk-without-android-studio-6d60d0f2812a

## Run Dev

- `npm install`
- `npm start`

## Build apk

- `cordova platform add <platform_name>` e.g. `cordova platform add android`
- `cordova build <platform_name>` e.g. `cordova build android`
