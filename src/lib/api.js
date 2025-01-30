export async function fetchPages() {
  const res = await fetch('https://admin.master-pool.co.il/api/pages-p');
  const data = await res.json();
  return data.data; // מחזיר את רשימת העמודים
}
