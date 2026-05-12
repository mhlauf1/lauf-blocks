import { FooterColumns } from "@/components/blocks/marketing/footer-columns/footer-columns"
import { footerColumnsContent } from "@/components/blocks/marketing/footer-columns/footer-columns.content"

export default function FooterColumnsPage() {
  return (
    <div className="flex min-h-[80dvh] flex-col justify-end">
      <FooterColumns content={footerColumnsContent} />
    </div>
  )
}
