"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Can, type Permission } from "@/core/rbac";
import { downloadCsv, toCsv, type CsvColumn } from "@/shared/lib/csv";
import { notifyApiError } from "@/shared/lib/notify";
import { Button } from "@/shared/ui";

/**
 * Nút xuất CSV dùng chung: chỉ hiện khi có quyền `export`, tải dữ liệu qua `fetchRows`
 * (API trả toàn bộ bản ghi khớp bộ lọc), sinh file CSV (có BOM cho Excel) và tải về.
 */
export function ExportCsvButton<T>({
  permission,
  filename,
  columns,
  fetchRows,
  noun,
  label = "Xuất CSV",
}: {
  permission: Permission;
  filename: string;
  columns: readonly CsvColumn<T>[];
  fetchRows: () => Promise<T[]>;
  noun: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const rows = await fetchRows();
      downloadCsv(filename, toCsv(rows, columns));
      toast.success(`Đã xuất ${rows.length} ${noun}`);
    } catch (error) {
      notifyApiError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Can permission={permission}>
      <Button variant="outline" size="sm" loading={loading} startIcon={<Download className="size-4" />} onClick={handleExport}>
        {label}
      </Button>
    </Can>
  );
}
