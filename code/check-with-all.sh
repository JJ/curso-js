#!/bin/bash

declare -a arr=("js" "js24" "gjs" "rhino")

for i in "${arr[@]}"
do
   echo "$i"
   $i hola-all.js
done
