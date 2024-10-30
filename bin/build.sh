#! /bin/bash

set -e

pnpm i

pnpm run --filter=vue --filter=react build

rm -rf docs
mkdir docs
cp -r packages/vue/dist docs/vue-app
cp -r packages/react/dist docs/react-app
