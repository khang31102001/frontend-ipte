"use client";

import { Activity, CalendarCheck, GraduationCap, Target, TrendingDown, TrendingUp, Trophy, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/core/config/routes";
import { BarList, ColumnChart, FunnelChart } from "@/shared/charts";
import { JOURNEY_STAGE_LABELS } from "@/shared/domain/pte";
import { formatDate, formatDateTime, formatNumber } from "@/shared/lib/format";
import { RequirePermission } from "@/shared/rbac/require-permission";
import { Badge, Card, CardBody, CardHeader, EmptyState, ErrorState, PageHeader, Select, Skeleton, StatCard } from "@/shared/ui";
import { useDashboardSummary } from "../hooks/use-dashboard";
import { RANGE_DAYS, RANGE_LABELS, type RangeDays } from "../types";

function Delta({ value }: { value: number }) {
  const up = value >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 ${up ? "text-success-600" : "text-error-600"}`}>
      <Icon className="size-3.5" aria-hidden />
      {up ? "+" : ""}
      {value}% so với kỳ trước
    </span>
  );
}

export function DashboardPage() {
  const [days, setDays] = useState<RangeDays>(90);
  const { data, isLoading, error, refetch, isFetching } = useDashboardSummary(days);

  return (
    <RequirePermission permission="dashboard.view">
      <PageHeader
        title="Dashboard"
        description="KPI từ Lead → Ghi danh → Học → Kết quả thi"
        actions={
          <label className="flex items-center gap-2 text-sm text-gray-600">
            Khoảng thời gian
            <Select aria-label="Khoảng thời gian" value={days} onChange={(e) => setDays(Number(e.target.value) as RangeDays)} className="h-10 w-auto py-0">
              {RANGE_DAYS.map((d) => (
                <option key={d} value={d}>
                  {RANGE_LABELS[d]}
                </option>
              ))}
            </Select>
          </label>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : error || !data ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : (
        <div className={`space-y-6 transition-opacity ${isFetching ? "opacity-70" : ""}`}>
          <section aria-label="Chỉ số chính" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Lead mới" value={formatNumber(data.kpis.newLeads)} hint={<Delta value={data.kpis.newLeadsDeltaPct} />} icon={<UserPlus className="size-5" />} />
            <StatCard label="Tỷ lệ chuyển đổi lead" value={`${data.kpis.leadConversionRate}%`} hint="Lead → đăng ký học" icon={<Target className="size-5" />} />
            <StatCard label="Ghi danh trong kỳ" value={formatNumber(data.kpis.enrollments)} hint={`${data.range.days} ngày gần nhất`} icon={<Users className="size-5" />} />
            <StatCard label="Đang học / thi thử" value={formatNumber(data.kpis.activeLearners)} hint="Học viên đang theo học" icon={<GraduationCap className="size-5" />} />
            <StatCard label="Kết quả thi" value={formatNumber(data.kpis.examResults)} hint="Ghi nhận trong kỳ" icon={<CalendarCheck className="size-5" />} />
            <StatCard label="Tỷ lệ đạt mục tiêu" value={`${data.kpis.passRate}%`} hint="Kết quả ≥ điểm mục tiêu" icon={<Trophy className="size-5" />} />
            <StatCard label="Điểm tăng trung bình" value={`+${data.kpis.avgScoreGain}`} hint="Từ test đầu vào → kết quả" icon={<Activity className="size-5" />} />
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <Card className="xl:col-span-3">
              <CardHeader title="Phễu chuyển đổi" description="Số học viên đã đi qua từng giai đoạn" />
              <CardBody>
                <FunnelChart
                  steps={data.funnel.map((f) => ({ label: JOURNEY_STAGE_LABELS[f.stage], count: f.count, fromPrevious: f.conversionFromPrevious, fromTop: f.conversionFromTop }))}
                />
              </CardBody>
            </Card>
            <Card className="xl:col-span-2">
              <CardHeader title="Nguồn lead" description="Kênh mang lại lead trong kỳ" />
              <CardBody>
                <BarList items={data.leadsBySource.map((s) => ({ label: s.label, value: s.count }))} />
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader title="Lead theo ngày" description={`${formatDate(data.range.from)} – ${formatDate(data.range.to)}`} />
            <CardBody>
              <ColumnChart
                ariaLabel="Số lead mới theo ngày"
                data={data.leadsByDay.map((p) => ({ label: p.date.slice(5), value: p.count }))}
                formatValue={(v) => `${v} lead`}
              />
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader
                title="Lead gần đây"
                actions={
                  <Link href={ROUTES.formSubmissions} className="text-sm text-brand-500 hover:underline">
                    Xem tất cả
                  </Link>
                }
              />
              <CardBody>
                {data.recentLeads.length === 0 ? (
                  <EmptyState title="Chưa có lead" className="py-8" />
                ) : (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {data.recentLeads.map((l) => (
                      <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">{l.fullName}</p>
                          <p className="truncate text-theme-xs text-gray-500">
                            {l.formName} · {l.phone}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <Badge color={l.status === "new" ? "primary" : "gray"}>{l.status === "new" ? "Mới" : "Đã xử lý"}</Badge>
                          <p className="mt-1 text-theme-xs text-gray-500">{formatDateTime(l.createdAt)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader
                title="Sắp thi / đang thi thử"
                actions={
                  <Link href={`${ROUTES.students.list}?stage=exam`} className="text-sm text-brand-500 hover:underline">
                    Xem học viên
                  </Link>
                }
              />
              <CardBody>
                {data.upcomingExams.length === 0 ? (
                  <EmptyState title="Chưa có học viên sắp thi" className="py-8" />
                ) : (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {data.upcomingExams.map((e) => (
                      <li key={e.studentId} className="flex items-center justify-between gap-3 py-3">
                        <Link href={ROUTES.students.detail(e.studentId)} className="min-w-0 hover:text-brand-500">
                          <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">{e.studentName}</p>
                          <p className="text-theme-xs text-gray-500">{e.studentCode}</p>
                        </Link>
                        <div className="shrink-0 text-right text-sm">
                          <Badge color={e.stage === "exam" ? "warning" : "primary"}>{JOURNEY_STAGE_LABELS[e.stage]}</Badge>
                          {e.examDate && <p className="mt-1 text-theme-xs text-gray-500">Thi ngày {formatDate(e.examDate)}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </RequirePermission>
  );
}
