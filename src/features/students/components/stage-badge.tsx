import { JOURNEY_STAGE_LABELS, type JourneyStage } from "@/shared/domain/pte";
import { Badge, type BadgeColor } from "@/shared/ui";
import { STUDENT_STATUS_LABELS, type StudentStatus } from "../types";

const STAGE_COLOR: Record<JourneyStage, BadgeColor> = {
  lead: "gray",
  test: "info",
  enroll: "warning",
  learn: "primary",
  mock: "primary",
  exam: "warning",
  result: "success",
};

export function StageBadge({ stage }: { stage: JourneyStage }) {
  return <Badge color={STAGE_COLOR[stage]}>{JOURNEY_STAGE_LABELS[stage]}</Badge>;
}

const STATUS_COLOR: Record<StudentStatus, BadgeColor> = { active: "success", paused: "warning", closed: "gray" };

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  return <Badge color={STATUS_COLOR[status]}>{STUDENT_STATUS_LABELS[status]}</Badge>;
}
