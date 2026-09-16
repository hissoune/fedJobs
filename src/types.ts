export type User = {

  name: string;
  age: number;
  email: string;
  password: string;
  imageUrl:string
};



export enum JobStatus {
  PENDING = 'PENDING',
  PROCESING = 'PROCESING',
  COMPLEETED = 'COMPLEETED',
  FAILED = 'FAILED',
}

export enum JobPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export type Job = {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;

  notes: string[];
  photos: string[];

  customerId: string;
  technicianId: string | null;
};