#!/bin/bash

sudo npm -g install depcheck 
npm -y init
deps=$(depcheck |cut -d: -f1 |tr -d '* ' | tail -n +2)

for package in ${deps[@]}; do
	echo 'Installing package: ' ${package}
	npm install ${package} --save
done

npm install validate.js --save
cp node_modules/validate.js/validate.min.js assets/js