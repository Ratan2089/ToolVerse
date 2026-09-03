import ToolHeader from "./ToolHeader";
import ToolFAQ from "./ToolFAQ";
import RelatedTools from "./RelatedTools";

export default function ToolLayout({
  tool,
  children,
  faq,
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <ToolHeader tool={tool} />

      <section>{children}</section>

      {faq?.length > 0 && <ToolFAQ faq={faq} />}

      <RelatedTools currentTool={tool} />
    </div>
  );
}