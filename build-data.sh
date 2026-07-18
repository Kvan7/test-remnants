#!/bin/bash

(
  cd data || exit 1
  pathofexile-dat
)

(
  cp data/tables/English/* public/data/tables/
)
