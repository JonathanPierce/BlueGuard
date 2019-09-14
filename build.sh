rm -rf build/*
cp manifest.json build/manifest.json
cp -r ./icons ./build/icons
cp -r ./src/static ./build/static
npx webpack
