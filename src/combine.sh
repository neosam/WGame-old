#! /bin/bash

if test -e wgame-all.js
then
  rm wgame-all.js
fi
cat *.js > wgame-all.js
