interface NewsDetailProps {
    params: Promise<{ id: string }>;
  }
  
  import Footer from "../../components/Footer";
  
  export default async function NewsDetail({ params }: NewsDetailProps) {
    const { id } = await params;
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    // Fetch main news
    const res = await fetch(`${API_URL}/api/news/${id}`, { cache: "no-store" });
    const payload = await res.json();
  
    if (!payload.status) {
      return <div className="p-6">News Not Found.</div>;
    }
  
    const data = payload.data;
  
    // Fetch latest 5 related news
    const latestRes = await fetch(`${API_URL}/api/news/latest`, {
      cache: "no-store",
    });
    const latestPayload = await latestRes.json();
    const latest = latestPayload.data ?? [];
  
    return (
      <>
        <div className="p-6 max-w-7xl mx-auto space-y-10">
        {/* LATEST NEWS ON TOP */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3">
            Latest News
          </h2>

          {latest.map((item: any) => (
            <div
              key={item.id}
              className="p-3 border border-blue-300 rounded-md shadow"
            >
              <a
                href={`/news/${item.id}`}
                className="font-semibold hover:underline text-blue-700"
              >
                {item.heading}
              </a>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        {/* MAIN NEWS BELOW */}
        <div>
          {data.image_url && (
            <img
              src={data.image_url}
              className="w-full h-64 object-cover rounded mb-4"
              alt="news"
            />
          )}

          <h1 className="text-3xl font-bold">{data.heading}</h1>

          <p className="text-gray-500 text-sm mt-1">
            {new Date(data.created_at).toLocaleString()}
          </p>

          <p className="mt-6">{data.news}</p>
        </div>
        </div>
        <Footer />
      </>
    );
  }
  