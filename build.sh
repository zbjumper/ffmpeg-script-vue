#!/bin/bash

# 从 package.json 读取版本号
VERSION=$(node -p "require('./package.json').version")

docker build -t zbjumper/ffmpeg-script:$VERSION --push .