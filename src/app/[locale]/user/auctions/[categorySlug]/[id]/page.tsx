import { LotDetailsView } from "@/src/views/Auction/LotDetails";

export default async function LotPage(props: {
  params: Promise<{ locale: string; slug: string; id: string }>;
}) {
  const params = await props.params;
  return <LotDetailsView id={params.id} />;
}
