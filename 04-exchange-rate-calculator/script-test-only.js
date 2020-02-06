// Test only
getTestData();

function getTestData() {
  fetch("items.json", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => (document.body.innerHTML = data[0].text));
}
