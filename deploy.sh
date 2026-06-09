#!/bin/bash

# 🧹 1. 이전 배포 찌꺼기 폴더 완전 세척
rm -rf deploy_build
mkdir -p deploy_build/apps/homepage
mkdir -p deploy_build/apps/map

echo "🚀 하위 폴더 멀티 앱 교차 빌드 시작..."

# 📦 2. apps/homepage 빌드 및 파일 수집
cd apps/homepage
bun vite build # 또는 npm run build
cp -r build/* ../../deploy_build/apps/homepage/
cd ../..

# 📦 3. apps/map 빌드 및 파일 수집
cd apps/map
bun vite build # 또는 npm run build
# 💡 만약 map 프로젝트의 출력 폴더가 dist라면 cp -r dist/* 로 유연하게 대처 가능
cp -r build/* ../../deploy_build/apps/map/
cd ../..

echo "✅ 모든 하위 앱 빌드 파일이 deploy_build/apps/ 안착 완공!"