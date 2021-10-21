export default async function checkAuth(ts, tsSign) {
  const body = {
    ts: ts,
    tsSign: tsSign
  };
  const response = await fetch(".netlify/functions/checkAuth", {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(body)
  });
  return response.text();
}
