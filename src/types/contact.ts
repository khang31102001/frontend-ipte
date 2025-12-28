export interface IConsultation {
  consultationId?: number | null;
  name: string;
  slug?: string;
  phone?: string | null;
  email?: string | null;
  targetScore?: string | null;
  message?: string | null;
}