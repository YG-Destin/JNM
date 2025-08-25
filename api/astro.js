// /api/astro.js

export default async function handler(req, res) {
  // ✅ CORS 허용 헤더 추가
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Preflight 요청 처리
    return res.status(200).end();
  }

  try {
    // 📌 쿼리에서 datetime 가져오기
    const { datetime } = req.query;
    if (!datetime) {
      return res.status(400).json({ error: "datetime 쿼리가 필요합니다." });
    }

    // 🌍 위치 (서울)
    const latitude = 37.5665;
    const longitude = 126.9780;

    // 🔑 AstronomyAPI 키
    const APP_ID = process.env.APP_ID;
    const APP_SECRET = process.env.APP_SECRET;

    const url = `https://api.astronomyapi.com/api/v2/studio/astro_chart?latitude=${latitude}&longitude=${longitude}&datetime=${datetime}`;

    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + Buffer.from(APP_ID + ":" + APP_SECRET).toString("base64"),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // ✅ 결과 그대로 브라우저에 전달
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
}
