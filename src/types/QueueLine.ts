import type { FormatedProStatus, Planning, TicketInfo } from "./Location";

export type WorkerStatus = "STOPED" | "AVAILABLE" | "UNAVAILABLE" | "DISABLED";

/**
 * Queue information for a worker or status category
 */
export type QueueInfo = {
  id: number;
  name: string;
  avatar: string | null;
  status: WorkerStatus;
  planning: Planning[];
  tickets: TicketInfo[];
  nextAvailable: NextAvailable | null;
  waitingSince: Date | null;
  formatedStatus: FormatedProStatus;
  startWorkerDate: Date;
  endWorkerDate: Date;
  isWorking: boolean;
  isFullSlotBooked: boolean;
};

/**
 * Information about the next available slot
 */
export type NextAvailable = {
  ticketBefore: number;
  next: Date;
  isFirstSlot: boolean;
  createHole: boolean;
};

/**
 * Queue lines organized by status and workers
 */
export type QueueLines = {
  workers: QueueInfo[];
  waiting: QueueInfo;
  unpayed: QueueInfo;
  done: QueueInfo;
};

export type QueueLineSSEvent = {
  avatar: string | null;
  defaultTicketDuration: number;
  defaultTicketDurationS: number;
  doctorId: number;
  id: number;
  locationId: number;
  name: string;
  status: string;
  tickets: {
    canceledTime: string | null;
    creationTime: string;
    deletedTime: string | null;
    doctorId: number;
    doneTime: number | null;
    duration: number;
    durationS: number;
    expectedTime: string;
    firstExpectedTime: string;
    id: number;
    locationId: number;
    rdvTime: number | null;
    slug: string;
    smsCount: number;
    startedTime: string | null;
    details: {
      age: number;
      carden: boolean;
      clientId: number | null;
      eticket: number | null;
      name: string;
      number: number;
      phone: string | null;
      sex: string;
      tickettype: string;
      prestations: {
        categoryId: number;
        description: string;
        discountedPrice: number;
        displayOrder: number;
        duration: number;
        durationS: number;
        id: number;
        image: string;
        locationId: number;
        name: string;
        picto: string;
        price: number;
        status: string;
        tag: string;
      }[];
    };
  }[];
  worker: {
    agendaLink: string | null;
    avatar: string | null;
    defaultTicketDuration: number;
    defaultTicketDurationS: number;
    endHour: number;
    endMinute: number;
    id: number;
    locationId: number;
    name: string;
    startHour: number;
    startMinute: number;
    status: string;
    ticketModules: null;
  };
};
