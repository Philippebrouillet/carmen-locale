import type { WorkerStatus } from "./QueueLine";

export type LocationTheme = "NEUTRAL" | "PINK" | "CARDEN";
export type LocationStatus = "open" | "full" | "closed";

// export type LocationInfo = {
//   id: number;
//   slug: string;
//   name: string;
//   avatar: string | null;
//   banner: string | null;
//   address: string;
//   zipCode: string;
//   city: string;
//   theme: LocationTheme;
//   config: { condition: []; hiddenFee: boolean };
//   externalCalendarIntegration: any;
//   externalCalendarIntegrationAuthorized: boolean;
//   externalCalendarLink: string;
//   fee: number;
//   instagramLink: string;
//   onlineShopLink: string;
//   overpriceExternalCalendar: any;
//   tarifMode: string;
//   tiktokLink: string;
//   website: string;
// };

// export type LocationInfoResp = {
//   location: LocationInfo;
//   services: ServiceInfo[];
//   workers: WorkerInfo[];
//   tickets: TicketInfo[];
//   planning: Planning[];
// };

// export type WorkerInfo = {
//   id: number;
//   name: string;
//   avatar: string | null;
//   status: WorkerStatus;
//   planning: Planning[];
// };

export type Planning = {
  workerId: number;
  day: [number, number]; // [year, ordinalDay]
  startTime: number; // timestamp in seconds
  endTime: number; // timestamp in seconds
  enabled: boolean;
};

// export type ServiceInfo = {
//   id: number;
//   name: string;
//   price: number;
//   durationS: number;
//   image: string | null;
// };

// export type TicketInfo = {
//   id: number;
//   workerId: number | null;
//   durationS: number;
//   canceledTime: Date | null;
//   doneTime: Date | null;
//   rdvTime: Date | null;
//   startedTime: Date | null;
//   details: any | null;
// };

export type TicketInfoWithTime = {
  id: number;
  // workerId: number | null;
  timeBefore: number;
  time: Date;
  durationS: number;
};

export type ServerTicketInfo = {
  id: number;
  workerId: number | null;
  durationS: number;
  canceledTime: number | null;
  doneTime: number | null;
  rdvTime: number | null;
  startedTime: number | null;
  details: object | null;
};

export type TicketInfo = {
  canceledTime: Date | null;
  creationTime: Date;
  deletedTime: Date | null;
  details: {
    age: number;
    carden: boolean;
    clientId: number | null;
    eticket: any;
    name: string;
    number: number;
    phone: string | null;
    prestations: any;
    sex: string;
    tickettype: string;
  };
  doctorId: number;
  doneTime: Date | null;
  duration: number;
  durationS: number;
  expectedTime: Date;
  firstExpectedTime: Date;
  id: number;
  locationId: number;
  rdvTime: Date;
  slug: string;
  smsCount: number;
  startedTime: Date;
};

export type WorkerInfo = {
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
  status: WorkerStatus;
  tickets: TicketInfo[];
};

export type LocationInfo = {
  id: number;
  slug: string;
  name: string;
  avatar: string | null;
  banner: string | null;
  address: string;
  zipCode: string;
  city: string;
  theme: LocationTheme;
  config: { condition: []; hiddenFee: boolean };
  externalCalendarIntegration: any | null;
  externalCalendarIntegrationAuthorized: boolean;
  externalCalendarLink: string | null;
  fee: number;
  instagramLink: string;
  onlineShopLink: string;
  overpriceExternalCalendar: any;
  tarifMode: string;
  tiktokLink: string;
  website: string;
  connectAccount: any | null;
  connectFee: any | null;
  createdAt: Date;
  locationType: string;
  phone: string;
  updatedAt: Date;
  categories: {
    description: string;
    flaggedForDeletion: boolean;
    id: number;
    locationId: number;
    name: string;
  }[];
};

export type ServiceInfo = {
  categoryId: number | null;
  description: string;
  discountedPrice: number | null;
  displayOrder: number;
  duration: number;
  durationS: number;
  id: number;
  image: string | null;
  locationId: number;
  name: string;
  picto: string;
  price: number;
  status: "DISABLED" | "ENABLED";
  tag: string;
};

export type LocationInfoResp = {
  location: LocationInfo;
  workers: WorkerInfo[];
  services: ServiceInfo[];
  planning: Planning[];
};
export type FormatedProStatus = "available" | "waiting" | "unavailable";
