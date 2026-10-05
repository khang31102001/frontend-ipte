import type { BaseEntity, ListQuery } from "@/core/api";

export const BRANCH_COUNTRIES = ["VN", "AU"] as const;
export type BranchCountry = (typeof BRANCH_COUNTRIES)[number];
export const BRANCH_COUNTRY_LABELS: Record<BranchCountry, string> = { VN: "Việt Nam", AU: "Úc" };

export const BRANCH_STATUSES = ["active", "inactive"] as const;
export type BranchStatus = (typeof BRANCH_STATUSES)[number];
export const BRANCH_STATUS_LABELS: Record<BranchStatus, string> = { active: "Đang hoạt động", inactive: "Ngưng hoạt động" };

export interface Branch extends BaseEntity {
  code: string;
  name: string;
  country: BranchCountry;
  city: string;
  address: string;
  phone: string;
  email?: string;
  managerName?: string;
  openingHours?: string;
  mapUrl?: string;
  status: BranchStatus;
  /** Số phòng học (API tính). */
  roomCount: number;
}

export interface BranchQuery extends ListQuery {
  country?: BranchCountry;
  status?: BranchStatus;
}

export const ROOM_TYPES = ["classroom", "lab", "meeting", "online"] as const;
export type RoomType = (typeof ROOM_TYPES)[number];
export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  classroom: "Phòng học",
  lab: "Phòng luyện thi (lab)",
  meeting: "Phòng họp / tư vấn",
  online: "Phòng học online",
};

export const ROOM_STATUSES = ["available", "maintenance"] as const;
export type RoomStatus = (typeof ROOM_STATUSES)[number];
export const ROOM_STATUS_LABELS: Record<RoomStatus, string> = { available: "Sẵn sàng", maintenance: "Bảo trì" };

export interface Room extends BaseEntity {
  branchId: string;
  name: string;
  capacity: number;
  type: RoomType;
  status: RoomStatus;
  equipment: string[];
}

export interface RoomQuery extends ListQuery {
  branchId?: string;
  type?: RoomType;
  status?: RoomStatus;
}
