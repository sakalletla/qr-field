import { CodeDetailView } from "./code-detail-view";

type Props = { params: Promise<{ id: string }> };

export default async function CodeDetailPage({ params }: Props) {
  const { id } = await params;
  return <CodeDetailView id={id} />;
}
