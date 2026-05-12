import { DataTableFull } from "@/components/blocks/app/data-table-full/data-table-full"
import {
  dataTableFullContent,
  type Workflow,
} from "@/components/blocks/app/data-table-full/data-table-full.content"

export default function DataTableFullPage() {
  return <DataTableFull<Workflow> content={dataTableFullContent} />
}
