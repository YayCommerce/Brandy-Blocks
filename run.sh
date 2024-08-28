#!/bin/bash
set -eo pipefail

function dev-init {
	composer install && yarn install && cd inc/Packages && yarn install && cd ../Externals && yarn install
}

function dev {
	yarn run dev
}

function release {
	echo "Generating build directory..."
	rm -rf "$(pwd)/release"
	mkdir -p "$(pwd)/release"

	echo "Install Blocks dependencies..."
	cd inc/Packages
	yarn install

	echo "Build Blocks..."
	yarn build

	echo "Syncing files..."
	cd ../..
	rsync -rc --exclude-from="$(pwd)/.distignore" "$(pwd)/" "$(pwd)/release/brandy-blocks" --delete --delete-excluded

	echo "Generating zip file..."
	cd release/brandy-blocks
	cd ..

	zip -q -r "brandy-blocks.zip" "brandy-blocks/"
	rm -rf brandy-blocks
	echo "Generated release file"

	echo "Release successfully"
}

function help {
  printf "%s <task> [args]\n\nTasks:\n" "${0}"

  compgen -A function | grep -v "^_" | cat -n
}

TIMEFORMAT=$'\nTask completed in %3lR'
time "${@:-help}"