interface HighlightDetailProps {
    params: Promise<{ id: string }>;
  }
  
  import Footer from "../../components/Footer";
  
  export default async function HighlightDetail({ params }: HighlightDetailProps) {
    const { id } = await params;
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    // Fetch main highlight item
    const res = await fetch(`${API_URL}/api/highlight/${id}`, {
      cache: "no-store",
    });
    const payload = await res.json();
  
    if (!payload.status) {
      return <div className="p-6">Highlight Not Found.</div>;
    }
  
    const data = payload.data;
  
    // Fetch latest 5 highlights
    const latestRes = await fetch(`${API_URL}/api/highlight/latest`, {
      cache: "no-store",
    });
    const latestPayload = await latestRes.json();
    const latest = latestPayload.data ?? [];
  
    return (
      <>
       <div className="p-6 max-w-7xl mx-auto space-y-10">
    {/* TOP — LATEST HIGHLIGHTS */}
        <div>
          <h2 className="text-3xl font-bold border-l-4 border-blue-600 text-gray-600 pl-3 mb-4">
            Latest Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latest.map((item: any) => (
              <a
                key={item.id}
                href={`/highlightnews/${item.id}`}
                className="p-4 border border-blue-300 rounded-md shadow hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-blue-700 hover:underline">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </a>
            ))}
          </div>
        </div>
    {/* MAIN NEWS SECTION */}
        <div>
          {data.image_url && (
            <img
              src={data.image_url}
              className="w-full h-64 object-cover rounded mb-4"
              alt="highlight"
            />
          )}

          <h1 className="text-2xl font-bold text-gray-600">{data.title}</h1>

          <p className="text-gray-500 text-sm mt-1">
            {new Date(data.created_at).toLocaleString()}
          </p>

          <p className="mt-6 text-gray-600">{data.highlight_news}</p>
        </div>
        </div>
        <Footer />
      </>
    );
  }
  