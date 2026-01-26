curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"Cooler Titel", "category":"Sonstig","body":"leblos"}' \
  http://localhost:3000/idea

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"Cooler Titel", "category":"","body":"leblos"}' \
  http://localhost:3000/idea