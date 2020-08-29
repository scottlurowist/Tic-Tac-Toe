#!/bin/bash

curl "https://tic-tac-toe-api-development.herokuapp.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "game": {
        "cell": {
          "index": 8,
          "value": "'"${VALUE}"'"
          },
        "over": false
    }'

echo