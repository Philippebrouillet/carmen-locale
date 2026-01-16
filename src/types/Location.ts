import type { WorkerStatus } from "./QueueLine";

export type LocationTheme = "NEUTRAL" | "PINK" | "CARDEN";
export type LocationStatus = "open" | "full" | "closed";

export type LocationPaymentMode =
  | "ONLINE_UPFRONT_FEE"
  | "ONLINE_FULL"
  | "ONSITE_FULL"
  | "CLIENT_CHOICE";

export type Planning = {
  workerId: number;
  day: [number, number]; // [year, ordinalDay]
  startTime: number; // timestamp in seconds
  endTime: number; // timestamp in seconds
  enabled: boolean;
};

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
export type BookingMode = "3H" | "DAY" | "ASAP";
export type LocationConfig = {
  client_cancel_refund_mode: "NONE" | "PARTIAL" | "COMPLETE";
  cut_on_overcharge: number;
  cut_on_overcharge_mode: "CONSTANT" | "VARIABLE";
  location_id: number;
  minimum_service_fee: number;
  booking_window: BookingMode;
  partial_refund_percent: number;
  payment_mode: LocationPaymentMode;
  pro_cancel_refund_mode: "NONE" | "PARTIAL" | "COMPLETE";
  service_fee: number;
  service_fee_included_in_overcharge: boolean;
  service_fee_mode: "CONSTANT" | "VARIABLE";
  show_refund_button: boolean;
  stripe_connect_enabled: boolean;
  upfront_fee_eur: number;
  upfront_fee_mode: "CONSTANT" | "VARIABLE";
  upfront_fee_percent: number;
  use_web_config_for_mobile: boolean;
  carden_spotlight_enabled: boolean;
  google_place_id: string | null;
  media_image_enabled: boolean;
  satisfaction_survey: "DEFAULT" | "CUSTOM";
  satisfaction_survey_link: string | null;
  service_fee_eur: number;
  service_fee_percent: number;
  sms_enabled: boolean;
  stripe_enabled: boolean;
  youtube_video_on_ticket_enabled: boolean;
  youtube_video_url: string | null;
};

export type LocationInfoResp = {
  location: LocationInfo;
  workers: WorkerInfo[];
  services: ServiceInfo[];
  planning: Planning[];
  config: LocationConfig;
};
export type FormatedProStatus = "available" | "waiting" | "unavailable";

export type PaymentMethod = "credit-card" | "in-store";
