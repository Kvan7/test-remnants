#!/bin/bash

echo "Extracting data"

(
  cd data || exit 1
  pathofexile-dat
)

echo "Copying data"

(
  cp data/tables/English/* public/data/tables/
)

echo "Done"
