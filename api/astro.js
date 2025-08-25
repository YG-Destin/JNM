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
   const ASTRO_APP_ID = "1bae1d9c-b506-4b69-b06e-724f48c17ea2";
const ASTRO_APP_SECRET = "f4fbdab592c38875ad0b31163d5f71bc97a04ebf3088f024e5cdf935a2cb9fc3752cd8ab71c7a65bf4cc06752773464de708a7eceda622b52f8eb114d4de39a05d71b9ea678c8d765067446ca495a8667ed2ff667a8add91869b59e764dacb538cba07f3f40b1030e816b007b97bcf5e";

async function getAstroData() {
  const url = "https://api.astronomyapi.com/api/v2/studio/star-chart";

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(ASTRO_APP_ID + ":" + ASTRO_APP_SECRET));
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, { headers: headers });
  const data = await response.json();
  console.log(data);
}

getAstroData();
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



