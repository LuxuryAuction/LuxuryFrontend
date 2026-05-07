import { LotDetailsView } from "@/src/views/Auction/LotDetails";

export default async function LotPage(props: PageProps<'/user/auctions/[categoryId]/[id]'>) {
  const params = await props.params;
  return <LotDetailsView id={params.id} />;
}
