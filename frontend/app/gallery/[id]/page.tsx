import GalleryPageClient from "./GalleryPageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // REQUIRED in Next.js 15

  return <GalleryPageClient id={id} />;
}
