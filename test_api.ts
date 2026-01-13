const res = await fetch("http://localhost:3000/api/health-check");
console.log("Status:", res.status);
const text = await res.text();
console.log("Body:", text);
