export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { datetime, latitude, longitude } = req.body;

    // 환경 변수 (Vercel에 저장해야 함)
    const APP_ID = process.env.APP_ID;
    const APP_SECRET = process.env.APP_SECRET;

    const response = await fetch("https://api.astronomyapi.com/api/v2/studio/astro_chart", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(APP_ID + ":" + APP_SECRET).toString("base64"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year: datetime.split("-")[0],
        month: datetime.split("-")[1],
        day: datetime.split("-")[2].slice(0, 2),
        hour: datetime.slice(11, 13),
        minute: datetime.slice(14, 16),
        latitude: latitude || 37.5665,   // 기본값 서울
        longitude: longitude || 126.9780,
        style: { theme: "default" }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("astro.js error:", error);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
}

