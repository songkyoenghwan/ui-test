#!/bin/bash

# 🧹 1. 기존 임시 폴더 세척
rm -rf deploy_build
mkdir -p deploy_build/apps/homepage
mkdir -p deploy_build/apps/map
mkdir -p deploy_build/apps/tour

echo "🚀 하위 폴더 멀티 앱 교차 빌드 시작..."

# 📦 2. apps/homepage 빌드 및 수집
cd apps/homepage
bun vite build
cp -r build/* ../../deploy_build/apps/homepage/
cd ../..

# 📦 3. apps/map 빌드 및 수집
cd apps/map
bun vite build
cp -r build/* ../../deploy_build/apps/map/
cd ../..

# 📦 3. apps/map 빌드 및 수집
cd apps/tour
bun vite build
cp -r build/* ../../deploy_build/apps/tour/
cd ../..

# 🎯 4. GitHub Pages 전용 오지랖 차단선 자동 생성
touch deploy_build/.nojekyll

echo "✅ 모든 빌드 파일 안착 완료!"
echo "🚚 윈도우 ENAMETOOLONG 우회 - 순정 Git 다이렉트 배포 격발..."

# 🌟 배포 본진 진입
cd deploy_build
git init

# ====================================================================
# 🌟 [초강력 방어선] 일회용 깃 배포 신원 강제 개통 (Author 에러 원천 박멸)
# ====================================================================
git config user.email "songkyoenghwan@users.noreply.github.com"
git config user.name "github-pages-bot"
# ====================================================================

git add -A
git commit -m "Deploy multi apps to GitHub Pages (Bypass ENAMETOOLONG)"

# 부모 폴더(..), 즉 ui-test 원본 레포지토리의 원격 주소(URL)를 자동으로 추출
REMOTE_URL=$(git -C .. remote get-url origin)

# 현재 임시 커밋된 본진(HEAD)의 파일들을 원격 레포의 gh-pages 브랜치로 강제 밀어넣기(-f)
git push -f "$REMOTE_URL" HEAD:gh-pages

cd ..
echo "🎉 [완공] GitHub Pages 배포 전선이 정상 개통되었습니다!"