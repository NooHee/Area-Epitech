#!/bin/bash

flutter pub get
flutter build apk

mv build/app/outputs/flutter-apk/app-release.apk /APK