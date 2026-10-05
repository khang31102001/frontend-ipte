"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { notifyApiError } from "@/shared/lib/notify";
import { studentService } from "../services/student-service";
import type { AdvanceJourneyInput, JourneyNoteInput, StudentProfileInput } from "../schemas";

export const studentHooks = createCrudHooks({ name: "students", service: studentService, label: "học viên" });
export const studentKeys = studentHooks.keys;

export const useStudents = studentHooks.useList;
export const useStudent = studentHooks.useDetail;
export const useCreateStudent = studentHooks.useCreate;
export const useUpdateStudent = studentHooks.useUpdate;
export const useDeleteStudent = studentHooks.useRemove;

export function useStudentProfile(studentId: string | undefined) {
  return useQuery({
    queryKey: studentKeys.custom("profile", studentId ?? ""),
    queryFn: ({ signal }) => studentService.getProfile(studentId as string, signal),
    enabled: Boolean(studentId),
  });
}

export function useSaveStudentProfile(studentId: string, options: { onSuccess?: () => void } = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: StudentProfileInput) => studentService.saveProfile(studentId, input),
    onSuccess: (profile) => {
      qc.setQueryData(studentKeys.custom("profile", studentId), profile);
      void qc.invalidateQueries({ queryKey: studentKeys.lists() });
      toast.success("Đã lưu hồ sơ PTE");
      options.onSuccess?.();
    },
    onError: notifyApiError,
  });
}

export function useStudentJourney(studentId: string | undefined) {
  return useQuery({
    queryKey: studentKeys.custom("journey", studentId ?? ""),
    queryFn: ({ signal }) => studentService.getJourney(studentId as string, signal),
    enabled: Boolean(studentId),
  });
}

function useJourneyMutation<TInput>(
  studentId: string,
  fn: (id: string, input: TInput) => Promise<unknown>,
  successMessage: string,
  onSuccess?: () => void,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: TInput) => fn(studentId, input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: studentKeys.custom("journey", studentId) });
      void qc.invalidateQueries({ queryKey: studentKeys.detail(studentId) });
      void qc.invalidateQueries({ queryKey: studentKeys.lists() });
      toast.success(successMessage);
      onSuccess?.();
    },
    onError: notifyApiError,
  });
}

export const useAdvanceJourney = (studentId: string, onSuccess?: () => void) =>
  useJourneyMutation<AdvanceJourneyInput>(studentId, studentService.advanceJourney, "Đã chuyển giai đoạn", onSuccess);

export const useAddJourneyNote = (studentId: string, onSuccess?: () => void) =>
  useJourneyMutation<JourneyNoteInput>(studentId, studentService.addJourneyNote, "Đã thêm ghi chú", onSuccess);
