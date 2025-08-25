// pages/api/astro.js  (Vercel 서버리스 함수)

// CORS 헤더 열기
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { datetime } = req.query;

  // 위치 (예: 서울)
  const latitude = 37.5665;
  const longitude = 126.9780;

  // Astronomy API Key
  const APP_ID = process.env.ASTRO_APP_ID;
  const APP_SECRET = process.env.ASTRO_APP_SECRET;

  const url = `https://api.astronomyapi.com/api/v2/studio/astro_chart?latitude=${latitude}&longitude=${longitude}&datetime=${datetime}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + Buffer.from(APP_ID + ":" + APP_SECRET).toString("base64"),
      },
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
}

