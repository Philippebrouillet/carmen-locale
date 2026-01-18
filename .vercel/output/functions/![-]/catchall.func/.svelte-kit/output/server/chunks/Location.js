const backgroundColorByThemeHeader = {
  NEUTRAL: "bg-dynamic-green",
  PINK: "bg-pink",
  CARDEN: "bg-blue"
};
const backgroundColorByStatusHeader = {
  open: "bg-dynamic-green",
  full: "bg-[#A03203]",
  closed: "bg-[#150B3D]"
};
const getBackgroundColorByStatusHeader = (status, theme) => status === "open" && theme !== "NEUTRAL" ? backgroundColorByThemeHeader[theme] : backgroundColorByStatusHeader[status];
const backgroundColorByTheme = {
  NEUTRAL: "bg-primary",
  PINK: "bg-pink",
  CARDEN: "bg-blue"
};
const proBackgroundColorByFormatedStatus = {
  available: `bg-[#00D4AA]`,
  waiting: `bg-[#0073FF]`,
  unavailable: "bg-[#DFE5E7]"
};
const getLocationStatus = (workers) => {
  if (!workers.length) return "closed";
  const workingWorkers = workers.filter((w) => w.status === "AVAILABLE" && w.isWorking);
  if (workingWorkers.length > 0 && workingWorkers.every((w) => {
    return w.isFullSlotBooked;
  })) {
    return "full";
  }
  const available = workers.filter((w) => ["waiting", "available"].includes(w.formatedStatus));
  if (!available.length) return "closed";
  return "open";
};
const mainBackgroundColorByTheme = {
  NEUTRAL: "bg-white",
  PINK: "bg-gradient-to-b from-[#FAF5FF] via-[#FDF2F8] to-[#FFF1F2]",
  CARDEN: "bg-[#F8FAFC]"
};
const formatTickets = (tickets) => {
  return tickets?.map((t) => {
    return {
      id: t.id,
      workerId: t.workerId,
      durationS: t.durationS,
      canceledTime: t.canceledTime ? new Date(t.canceledTime) : null,
      doneTime: t.doneTime ? new Date(t.doneTime) : null,
      rdvTime: t.rdvTime ? new Date(t.rdvTime) : null,
      startedTime: t.startedTime ? new Date(t.startedTime) : null,
      details: t.details
    };
  });
};
const formatLocationResponse = (locationResp) => {
  const workers = locationResp.queueLines.flatMap((ql) => ({
    ...ql.worker,
    tickets: formatTickets(ql.tickets)
  })).filter((w) => w != null && w.name);
  const locationInfo = {
    location: locationResp.location,
    services: locationResp.location.catalog ?? [],
    workers,
    planning: []
  };
  console.log("locationInfo", locationInfo);
  return locationInfo;
};
export {
  getBackgroundColorByStatusHeader as a,
  backgroundColorByTheme as b,
  formatLocationResponse as f,
  getLocationStatus as g,
  mainBackgroundColorByTheme as m,
  proBackgroundColorByFormatedStatus as p
};
