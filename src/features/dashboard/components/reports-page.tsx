"use client";

import { useMemo, useState } from "react";
import { Can } from "@/core/rbac";
import { BarList, ColumnChart, FunnelChart } from "@/shared/charts";
import { ExportCsvButton } from "@/shared/crud";
import { JOURNEY_STAGE_LABELS } from "@/shared/domain/pte";
import { formatDate } from "@/shared/lib/format";
import { useLookup } from "@/shared/lookups/use-lookup";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Card, CardBody, CardHeader, ErrorState, Input, PageHeader, Select, Skeleton, Tabs } from "@/shared/ui";
import { useEnrollmentsReport, useFunnelReport, useLeadSourcesReport } from "../hooks/use-dashboard";
import { dashboardService } from "../services/dashboard-service";
import { ENROLLMENT_GROUP_LABELS, type EnrollmentGroupBy, type FunnelStep } from "../types";

type TabKey = "funnel" | "leads" | "enrollments";
const TABS = [
  { key: "funnel", label: "Phễu Lead → Kết quả" },
  { key: "leads", label: "Nguồn lead" },
  { key: "enrollments", label: "Ghi danh" },
] as const;

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

function Panel({ isLoading, error, onRetry, children }: { isLoading: boolean; error: unknown; onRetry: () => void; children: React.ReactNode }) {
  if (isLoading) return <Skeleton className="h-72 w-full" />;
  if (error) return <ErrorState onRetry={onRetry} />;
  return <>{children}</>;
}

function FunnelTab({ range }: { range: { from: string; to: string; branchId?: string } }) {
  const { data, isLoading, error, refetch } = useFunnelReport(range);
  const rows = data?.steps ?? [];
  return (
    <Panel isLoading={isLoading} error={error} onRetry={() => void refetch()}>
      <Card>
        <CardHeader
          title="Phễu chuyển đổi học viên"
          description={data ? `${data.totalStudents} học viên được tạo trong kỳ` : undefined}
          actions={
            <ExportCsvButton<FunnelStep>
              permission="report.export"
              noun="dòng"
              filename="pheu-chuyen-doi.csv"
              columns={[
                { header: "Giai đoạn", value: (s) => JOURNEY_STAGE_LABELS[s.stage] },
                { header: "Số học viên", value: (s) => s.count },
                { header: "% so với bước trước", value: (s) => s.conversionFromPrevious },
                { header: "% so với đầu phễu", value: (s) => s.conversionFromTop },
              ]}
              fetchRows={() => dashboardService.exportFunnel(range)}
            />
          }
        />
        <CardBody className="space-y-6">
          <FunnelChart steps={rows.map((f) => ({ label: JOURNEY_STAGE_LABELS[f.stage], count: f.count, fromPrevious: f.conversionFromPrevious, fromTop: f.conversionFromTop }))} />
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full text-sm">
              <caption className="sr-only">Số liệu phễu chuyển đổi</caption>
              <thead className="bg-gray-50 text-theme-xs tracking-wide text-gray-500 uppercase dark:bg-white/[0.02]">
                <tr>
                  <th className="px-4 py-2.5 text-left">Giai đoạn</th>
                  <th className="px-4 py-2.5 text-right">Học viên</th>
                  <th className="px-4 py-2.5 text-right">% so với bước trước</th>
                  <th className="px-4 py-2.5 text-right">% so với đầu phễu</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.stage} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="px-4 py-2.5">{JOURNEY_STAGE_LABELS[s.stage]}</td>
                    <td className="px-4 py-2.5 text-right font-medium">{s.count}</td>
                    <td className="px-4 py-2.5 text-right">{s.conversionFromPrevious === null ? "—" : `${s.conversionFromPrevious}%`}</td>
                    <td className="px-4 py-2.5 text-right">{s.conversionFromTop}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Panel>
  );
}

function LeadsTab({ range }: { range: { from: string; to: string; branchId?: string } }) {
  const { data, isLoading, error, refetch } = useLeadSourcesReport(range);
  return (
    <Panel isLoading={isLoading} error={error} onRetry={() => void refetch()}>
      {data && (
        <div className="space-y-6">
          <Card>
            <CardHeader title="Lead theo ngày" description={`${data.total} lead (không tính spam)`} />
            <CardBody>
              <ColumnChart ariaLabel="Lead theo ngày" data={data.byDay.map((p) => ({ label: p.date.slice(5), value: p.count }))} formatValue={(v) => `${v} lead`} />
            </CardBody>
          </Card>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader title="Theo nguồn" />
              <CardBody>
                <BarList items={data.bySource.map((s) => ({ label: s.label, value: s.count }))} />
              </CardBody>
            </Card>
            <Card>
              <CardHeader title="Theo loại biểu mẫu" />
              <CardBody>
                <BarList items={data.byFormType.map((s) => ({ label: s.label, value: s.count }))} />
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </Panel>
  );
}

function EnrollmentsTab({ range }: { range: { from: string; to: string; branchId?: string } }) {
  const [groupBy, setGroupBy] = useState<EnrollmentGroupBy>("month");
  const { data, isLoading, error, refetch } = useEnrollmentsReport(range, groupBy);
  return (
    <Panel isLoading={isLoading} error={error} onRetry={() => void refetch()}>
      {data && (
        <Card>
          <CardHeader
            title="Ghi danh"
            description={`${data.total} lượt ghi danh`}
            actions={
              <Select aria-label="Nhóm theo" value={groupBy} onChange={(e) => setGroupBy(e.target.value as EnrollmentGroupBy)} className="h-10 w-auto py-0">
                {(Object.keys(ENROLLMENT_GROUP_LABELS) as EnrollmentGroupBy[]).map((g) => (
                  <option key={g} value={g}>
                    {ENROLLMENT_GROUP_LABELS[g]}
                  </option>
                ))}
              </Select>
            }
          />
          <CardBody>
            {groupBy === "month" ? (
              <ColumnChart ariaLabel="Ghi danh theo tháng" height={200} data={data.rows.map((r) => ({ label: r.label, value: r.count }))} formatValue={(v) => `${v} ghi danh`} />
            ) : (
              <BarList items={data.rows.map((r) => ({ label: r.label, value: r.count }))} />
            )}
          </CardBody>
        </Card>
      )}
    </Panel>
  );
}

export function ReportsPage() {
  const [tab, setTab] = useState<TabKey>("funnel");
  const today = useMemo(() => new Date(), []);
  const [from, setFrom] = useState(isoDate(new Date(today.getTime() - 365 * 86_400_000)));
  const [to, setTo] = useState(isoDate(today));
  const [branchId, setBranchId] = useState("");
  const branches = useLookup("branches");
  const range = { from, to, branchId: branchId || undefined };

  return (
    <RequirePermission permission="report.view">
      <PageHeader title="Báo cáo" description="Phễu Lead → Ghi danh → Học → Kết quả thi, nguồn lead và ghi danh" />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          Từ ngày
          <Input type="date" aria-label="Từ ngày" value={from} max={to} onChange={(e) => setFrom(e.target.value)} className="h-10 w-auto py-0" />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          Đến ngày
          <Input type="date" aria-label="Đến ngày" value={to} min={from} onChange={(e) => setTo(e.target.value)} className="h-10 w-auto py-0" />
        </label>
        <Select aria-label="Cơ sở" value={branchId} onChange={(e) => setBranchId(e.target.value)} className="h-10 w-auto min-w-44 py-0">
          <option value="">Cơ sở: Tất cả</option>
          {branches.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <span className="text-theme-xs text-gray-500">
          {formatDate(from)} – {formatDate(to)}
        </span>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />
      {tab === "funnel" && <FunnelTab range={range} />}
      {tab === "leads" && <LeadsTab range={range} />}
      {tab === "enrollments" && <EnrollmentsTab range={range} />}
      <Can permission="report.export">
        <p className="mt-4 text-theme-xs text-gray-500">Bạn có thể xuất số liệu từng báo cáo ở nút “Xuất CSV”.</p>
      </Can>
    </RequirePermission>
  );
}
