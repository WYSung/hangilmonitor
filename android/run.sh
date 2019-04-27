#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.technonia.hangilmonitor/host.exp.exponent.MainActivity
