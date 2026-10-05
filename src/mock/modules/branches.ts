import type { Branch, Room } from "@/features/branches/types";
import { branchSchema, roomSchema, type BranchInput, type RoomInput } from "@/features/branches/schemas";
import { collection, registerCollection } from "../engine/db";
import { conflict } from "../engine/responses";
import { defineResource } from "../engine/resource";
import { registerLookup } from "../engine/lookups";
import { addRoutes } from "../engine/router";
import { isoDaysAgo } from "../seed/random";

export const BRANCHES = "branches";
export const ROOMS = "rooms";

function seedBranches(): Branch[] {
  const rows: Omit<Branch, "createdAt" | "updatedAt" | "roomCount">[] = [
    { id: "br-001", code: "HCM-Q1", name: "PTE iPASS Hồ Chí Minh – Quận 1", country: "VN", city: "TP. Hồ Chí Minh", address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1", phone: "028 3822 1234", email: "hcm@pteipass.vn", managerName: "Trần Thị Tư Vấn", openingHours: "08:00 – 21:00 (T2–CN)", mapUrl: "https://maps.google.com/?q=Nguyen+Hue+Q1", status: "active" },
    { id: "br-002", code: "HN-CG", name: "PTE iPASS Hà Nội – Cầu Giấy", country: "VN", city: "Hà Nội", address: "45 Duy Tân, Dịch Vọng Hậu, Cầu Giấy", phone: "024 3755 6789", email: "hanoi@pteipass.vn", managerName: "Lê Minh Học Vụ", openingHours: "08:00 – 21:00 (T2–T7)", mapUrl: "https://maps.google.com/?q=Duy+Tan+Cau+Giay", status: "active" },
    { id: "br-003", code: "BNE", name: "PTE iPASS Brisbane", country: "AU", city: "Brisbane", address: "Level 5, 100 Queen St, Brisbane QLD 4000", phone: "+61 450 383 579", email: "brisbane@pteipass.vn", managerName: "Amy Đoàn", openingHours: "09:00 – 18:00 (Mon–Sat)", status: "active" },
    { id: "br-004", code: "MEL", name: "PTE iPASS Melbourne", country: "AU", city: "Melbourne", address: "Suite 12, 200 Elizabeth St, Melbourne VIC 3000", phone: "+61 412 345 678", email: "melbourne@pteipass.vn", openingHours: "09:00 – 18:00 (Mon–Fri)", status: "inactive" },
  ];
  return rows.map((b, i) => ({ ...b, roomCount: 0, createdAt: isoDaysAgo(500 - i * 20), updatedAt: isoDaysAgo(30 + i) }));
}

function seedRooms(): Room[] {
  const defs: [string, string, number, Room["type"], Room["status"], string[]][] = [
    ["br-001", "Phòng A1", 20, "classroom", "available", ["Máy chiếu", "Điều hòa", "Bảng trắng"]],
    ["br-001", "Phòng A2", 15, "classroom", "available", ["Tivi 65 inch", "Điều hòa"]],
    ["br-001", "Lab Speaking", 12, "lab", "available", ["Tai nghe", "Mic", "Máy tính"]],
    ["br-001", "Phòng tư vấn", 6, "meeting", "available", ["Tivi", "Bàn họp"]],
    ["br-002", "Phòng B1", 24, "classroom", "available", ["Máy chiếu", "Điều hòa"]],
    ["br-002", "Phòng B2", 16, "classroom", "maintenance", ["Máy chiếu"]],
    ["br-002", "Lab Mock Test", 20, "lab", "available", ["Máy tính", "Tai nghe", "Mic chống ồn"]],
    ["br-003", "Room 1", 10, "classroom", "available", ["Projector", "Whiteboard"]],
    ["br-003", "Zoom Studio", 30, "online", "available", ["Webcam HD", "Mic", "Ring light"]],
    ["br-004", "Room M1", 10, "classroom", "available", ["Projector"]],
  ];
  return defs.map(([branchId, name, capacity, type, status, equipment], i) => ({
    id: `room-${String(i + 1).padStart(3, "0")}`,
    branchId,
    name,
    capacity,
    type,
    status,
    equipment,
    createdAt: isoDaysAgo(400 - i * 5),
    updatedAt: isoDaysAgo(20 + i),
  }));
}

export function registerBranchesModule(): void {
  registerCollection<Branch>(BRANCHES, seedBranches);
  registerCollection<Room>(ROOMS, seedRooms);

  registerLookup("branches", () =>
    collection<Branch>(BRANCHES).filter((b) => b.status === "active").map((b) => ({ value: b.id, label: b.name })),
  );

  const countRooms = (branchId: string) => collection<Room>(ROOMS).filter((r) => r.branchId === branchId).length;

  addRoutes(
    ...defineResource<Branch, BranchInput>({
      path: "/branches",
      permission: "branch",
      collection: BRANCHES,
      idPrefix: "br",
      label: "cơ sở",
      entityName: (b) => b.name,
      createSchema: branchSchema,
      list: {
        searchFields: ["name", "code", "city", "address"],
        filters: { country: "country", status: "status" },
        sortable: ["name", "code", "city", "createdAt", "status"],
        defaultSort: { sortBy: "name", sortOrder: "asc" },
      },
      unique: [{ field: "code", message: "Mã cơ sở đã tồn tại" }],
      build: (input, base) => ({ ...input, ...base, roomCount: 0 }),
      present: (b) => ({ ...b, roomCount: countRooms(b.id) }),
      beforeDelete: (b) => (countRooms(b.id) > 0 ? conflict("Cơ sở còn phòng học, hãy xóa/chuyển phòng trước") : undefined),
    }),
    ...defineResource<Room, RoomInput>({
      path: "/rooms",
      permission: "branch",
      collection: ROOMS,
      idPrefix: "room",
      label: "phòng học",
      entityName: (r) => r.name,
      createSchema: roomSchema,
      list: {
        searchFields: ["name"],
        filters: { branchId: "branchId", type: "type", status: "status" },
        sortable: ["name", "capacity", "createdAt"],
        defaultSort: { sortBy: "name", sortOrder: "asc" },
      },
    }),
  );
}
