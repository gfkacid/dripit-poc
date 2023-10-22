// "use client";
import Slides from "@/components/landing/Slides";
import Drops from "@/components/landing/Drops";
import Activity from "@/components/landing/Activity";
import Collectors from "@/components/landing/Collectors";
import Faq from "@/components/landing/Faq";

async function getLandingData() {
  const entities = [
    { path: "slider", key: "slides" },
    { path: "latest-drops", key: "drops" },
    { path: "latest-activity", key: "activity" },
    { path: "top-collectors", key: "collectors" },
  ];

  const data = await Promise.all(
    entities.map(async ({ path, key }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);

      if (!res.ok) {
        console.error(key, "Failed to fetch data");
        return [];
      }

      return res.json();
    })
  );

  return entities.reduce((acc, { key }, index) => {
    acc[key] = data?.[index] ?? [];

    return acc;
  }, {});
}

export default async function Home() {
  const { slides, drops, activity, collectors } = await getLandingData();

  return (
    <div className="min-h-screen">
      <Slides data={slides} />

      <div className="container mx-auto px-8">
        <Drops data={drops} />
        <Activity data={activity} />
        <Collectors data={collectors} />
        <Faq />
      </div>
    </div>
  );
}
