import type {
  FormatedProStatus,
  LocationInfoResp,
  LocationStatus,
  LocationTheme,
  ServerTicketInfo,
} from "$src/types/Location";
import type { QueueInfo } from "$src/types/QueueLine";

const backgroundColorByThemeHeader: Record<LocationTheme, string> = {
  NEUTRAL: "bg-dynamic-green",
  PINK: "bg-pink",
  CARDEN: "bg-blue",
};

const backgroundColorByStatusHeader: Record<LocationStatus, string> = {
  open: "bg-dynamic-green",
  full: "bg-[#A03203]",
  closed: "bg-[#150B3D]",
};

export const getBackgroundColorByStatusHeader = (
  status: LocationStatus,
  theme: LocationTheme,
): string =>
  status === "open" && theme !== "NEUTRAL"
    ? backgroundColorByThemeHeader[theme]
    : backgroundColorByStatusHeader[status];

export const backgroundColorByTheme: Record<LocationTheme, string> = {
  NEUTRAL: "bg-primary",
  PINK: "bg-pink",
  CARDEN: "bg-blue",
};

export const proBackgroundColorByFormatedStatus: Record<FormatedProStatus, string> = {
  available: `bg-[#00D4AA]`,
  waiting: `bg-[#0073FF]`,
  unavailable: "bg-[#DFE5E7]",
};

export const getLocationStatus = (workers: QueueInfo[]): LocationStatus => {
  if (!workers.length) return "closed";

  const available = workers.filter((w) => w.formatedStatus !== "unavailable");

  if (!available.length) return "closed";

  return available.every((w) => w.formatedStatus === "waiting") ? "full" : "open";
};

export const mainBackgroundColorByTheme: Record<LocationTheme, string> = {
  NEUTRAL: "bg-white",
  PINK: "bg-gradient-to-b from-[#FAF5FF] via-[#FDF2F8] to-[#FFF1F2]",
  CARDEN: "bg-[#F8FAFC]",
};

export const formatLocationResponse = (locationResp: any) => {
  const workers = locationResp.queueLines
    .flatMap((ql) => ({
      ...ql.worker,
      tickets: ql.tickets?.map((t: ServerTicketInfo) => {
        return {
          id: t.id,
          workerId: t.workerId,
          durationS: t.durationS,
          canceledTime: t.canceledTime ? new Date(t.canceledTime) : null,
          doneTime: t.doneTime ? new Date(t.doneTime) : null,
          rdvTime: t.rdvTime ? new Date(t.rdvTime) : null,
          startedTime: t.startedTime ? new Date(t.startedTime) : null,
          details: t.details,
        };
      }),
    }))
    .filter((w) => w != null && w.name);

  const locationInfo: LocationInfoResp = {
    location: locationResp.location,
    services: locationResp.location.catalog.filter((s) => s.status === "ENABLED") ?? [],
    workers: workers,
    planning: [],
  };
  console.log("locationInfo", locationInfo);
  return locationInfo;
};
