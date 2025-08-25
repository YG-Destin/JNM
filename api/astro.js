// Vercel Serverless Function (Node.js 환경)
export default async function handler(req, res) {
  const { datetime } = req.query;

  if (!datetime) {
    return res.status(400).json({ error: "날짜와 시간이 필요합니다." });
  }

  const latitude = 37.5665;   // 서울 위도
  const longitude = 126.9780; // 서울 경도

  const APP_ID = process.env.ASTRO_APP_ID;
  const APP_SECRET = process.env.ASTRO_APP_SECRET;

  const url = `https://api.astronomyapi.com/api/v2/studio/astro_chart?latitude=${latitude}&longitude=${longitude}&date=${datetime.split("T")[0]}&time=${datetime.split("T")[1]}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Basic " + Buffer.from(APP_ID + ":" + APP_SECRET).toString("base64"),
      },
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API 호출 실패", details: error.message });
  }
}