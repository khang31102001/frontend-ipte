"use client";

import { Check, Flag, MessageSquarePlus, StickyNote } from "lucide-react";
import { useState } from "react";
import { Can } from "@/core/rbac";
import { Form, FormModal, createFormFields, useEntityForm } from "@/shared/form";
import { JOURNEY_STAGES, JOURNEY_STAGE_LABELS, type JourneyStage } from "@/shared/domain/pte";
import { cn } from "@/shared/lib/cn";
import { formatDate, formatDateTime } from "@/shared/lib/format";
import { Badge, Button, Card, CardBody, CardHeader, EmptyState, ErrorState, Skeleton } from "@/shared/ui";
import { useAddJourneyNote, useAdvanceJourney, useStudentJourney } from "../hooks/use-students";
import {
  advanceJourneySchema,
  journeyNoteSchema,
  type AdvanceJourneyFormValues,
  type JourneyNoteFormValues,
} from "../schemas";
import type { JourneyEvent } from "../types";

const AF = createFormFields<AdvanceJourneyFormValues>();
const NF = createFormFields<JourneyNoteFormValues>();

/** Thanh tiến trình 7 giai đoạn: Lead → Test → Enroll → Learn → Mock → Exam → Result. */
function Stepper({ current }: { current: JourneyStage }) {
  const currentIndex = JOURNEY_STAGES.indexOf(current);
  return (
    <ol className="flex items-start overflow-x-auto pb-2" aria-label="Tiến trình hành trình học viên">
      {JOURNEY_STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={stage} className="flex min-w-[88px] flex-1 flex-col items-center text-center" aria-current={active ? "step" : undefined}>
            <div className="flex w-full items-center">
              <div className={cn("h-0.5 flex-1", i === 0 ? "bg-transparent" : i <= currentIndex ? "bg-brand-500" : "bg-gray-200")} />
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
                  done && "border-brand-500 bg-brand-500 text-white",
                  active && "border-brand-500 bg-white text-brand-500 ring-4 ring-brand-500/15",
                  !done && !active && "border-gray-200 bg-white text-gray-400",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </div>
              <div className={cn("h-0.5 flex-1", i === JOURNEY_STAGES.length - 1 ? "bg-transparent" : i < currentIndex ? "bg-brand-500" : "bg-gray-200")} />
            </div>
            <span className={cn("mt-2 text-theme-xs font-medium", active ? "text-brand-500" : done ? "text-gray-700" : "text-gray-400")}>
              {JOURNEY_STAGE_LABELS[stage]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function EventItem({ event }: { event: JourneyEvent }) {
  const isNote = event.kind === "note";
  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      <span aria-hidden className="absolute top-8 bottom-0 left-4 w-px bg-gray-200 last:hidden" />
      <span
        className={cn(
          "z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
          isNote ? "bg-gray-100 text-gray-500" : "bg-brand-25 text-brand-500",
        )}
      >
        {isNote ? <StickyNote className="size-4" /> : <Flag className="size-4" />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">{event.title}</p>
          {event.data?.score !== undefined && <Badge color="info">{event.data.score} điểm</Badge>}
          {event.data?.passed !== undefined && (
            <Badge color={event.data.passed ? "success" : "error"}>{event.data.passed ? "Đạt mục tiêu" : "Chưa đạt"}</Badge>
          )}
          {event.data?.examDate && <Badge color="warning">Thi ngày {formatDate(event.data.examDate)}</Badge>}
        </div>
        {event.note && <p className="mt-1 text-sm whitespace-pre-line text-gray-600 dark:text-gray-400">{event.note}</p>}
        <p className="mt-1 text-theme-xs text-gray-500">
          {formatDateTime(event.occurredAt)} · {event.createdByName}
        </p>
      </div>
    </li>
  );
}

function AdvanceDialog({ studentId, current, open, onClose }: { studentId: string; current: JourneyStage; open: boolean; onClose: () => void }) {
  const advance = useAdvanceJourney(studentId);
  const nextStages = JOURNEY_STAGES.slice(JOURNEY_STAGES.indexOf(current) + 1);
  const defaultStage = nextStages[0] ?? current;

  const { form, onSubmit, isSubmitting } = useEntityForm({
    schema: advanceJourneySchema,
    defaults: { stage: defaultStage, note: "", examDate: "" },
    resetKey: `${open}-${current}`,
    create: (values) => advance.mutateAsync(values),
    onSaved: onClose,
  });
  const stage = form.watch("stage");

  return (
    <FormModal open={open} onClose={onClose} title="Chuyển giai đoạn" description="Học viên chỉ được chuyển tiếp sang giai đoạn sau." formId="advance-form" submitting={isSubmitting} submitLabel="Chuyển giai đoạn">
      <Form form={form} onSubmit={onSubmit} id="advance-form">
        <AF.Select name="stage" label="Giai đoạn mới" options={nextStages.map((s) => ({ value: s, label: JOURNEY_STAGE_LABELS[s] }))} />
        {(stage === "test" || stage === "mock" || stage === "result") && (
          <AF.Input name="score" label={stage === "result" ? "Điểm kết quả" : "Điểm"} type="number" numeric min={10} max={90} required={stage === "result"} />
        )}
        {stage === "exam" && <AF.Input name="examDate" label="Ngày thi" type="date" required />}
        {stage === "result" && <AF.Checkbox name="passed" label="Đạt mục tiêu" />}
        <AF.Textarea name="note" label="Ghi chú" rows={3} />
      </Form>
    </FormModal>
  );
}

function NoteDialog({ studentId, open, onClose }: { studentId: string; open: boolean; onClose: () => void }) {
  const add = useAddJourneyNote(studentId);
  const { form, onSubmit, isSubmitting } = useEntityForm({
    schema: journeyNoteSchema,
    defaults: { note: "" },
    resetKey: open,
    create: (values) => add.mutateAsync(values),
    onSaved: onClose,
  });
  return (
    <FormModal open={open} onClose={onClose} title="Thêm ghi chú" formId="note-form" submitting={isSubmitting}>
      <Form form={form} onSubmit={onSubmit} id="note-form">
        <NF.Textarea name="note" label="Nội dung" rows={4} required placeholder="Đã gọi tư vấn, hẹn test đầu vào thứ 6…" />
      </Form>
    </FormModal>
  );
}

export function StudentJourney({ studentId }: { studentId: string }) {
  const { data, isLoading, error, refetch } = useStudentJourney(studentId);
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  if (isLoading) return <Skeleton className="h-80 w-full" />;
  if (error || !data) return <ErrorState onRetry={() => void refetch()} />;

  const canAdvance = data.currentStage !== "result";

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title="Hành trình học viên"
          description={`Giai đoạn hiện tại: ${JOURNEY_STAGE_LABELS[data.currentStage]}`}
          actions={
            <Can permission="student.edit">
              <Button variant="outline" size="sm" startIcon={<MessageSquarePlus className="size-4" />} onClick={() => setNoteOpen(true)}>
                Ghi chú
              </Button>
              {canAdvance && (
                <Button size="sm" onClick={() => setAdvanceOpen(true)}>
                  Chuyển giai đoạn
                </Button>
              )}
            </Can>
          }
        />
        <CardBody>
          <Stepper current={data.currentStage} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Lịch sử" description={`${data.events.length} sự kiện`} />
        <CardBody>
          {data.events.length === 0 ? (
            <EmptyState title="Chưa có sự kiện nào" />
          ) : (
            <ol className="mt-2">
              {data.events.map((e) => (
                <EventItem key={e.id} event={e} />
              ))}
            </ol>
          )}
        </CardBody>
      </Card>

      <AdvanceDialog studentId={studentId} current={data.currentStage} open={advanceOpen} onClose={() => setAdvanceOpen(false)} />
      <NoteDialog studentId={studentId} open={noteOpen} onClose={() => setNoteOpen(false)} />
    </div>
  );
}
