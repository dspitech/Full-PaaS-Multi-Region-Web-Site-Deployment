export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  year: number;
  status: 'active' | 'inactive' | 'graduated';
  enrollmentDate: string;
  avatar?: string;
}

export type StudentFormData = Omit<Student, 'id'>;
