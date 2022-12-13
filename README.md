# Cordova with React app

- No reco cli
- Following [this tutorial](https://blog.devgenius.io/convert-your-react-application-to-an-andriod-ios-app-using-cordova-87646729c2b7)
- Cordova doc: https://cordova.apache.org/docs/en/latest/
- Cordova indexDB: https://cordova.apache.org/docs/en/11.x/cordova/storage/storage.html#indexeddb

## Requirements to build apk

- Setup gradle: https://linuxize.com/post/how-to-install-gradle-on-ubuntu-20-04/
- Setup Android SDK without android studio: https://proandroiddev.com/how-to-setup-android-sdk-without-android-studio-6d60d0f2812a

## .env

We need to provide `token` from `https://jmp-explorer.akvotest.org` to able fetch the webform detail

- `REACT_APP_TOKEN="string"`

## Run Dev

- `npm install`
- `npm start`

## Build apk

- `cordova platform add <platform_name>` e.g. `cordova platform add android`
- `cordova build <platform_name>` e.g. `cordova build android`
