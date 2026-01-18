import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute, m as missing_component, d as each, o as onDestroy } from "../../../../chunks/ssr.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { c as clock } from "../../../../chunks/clock.svelte.js";
import { L as LocationHeader, E as ExternalLinks, a as LocationSection } from "../../../../chunks/ExternalLinks.js";
import { g as getLocationStatus } from "../../../../chunks/Location.js";
import { c as computeQueue } from "../../../../chunks/QueueLine.js";
import { l as languageTag } from "../../../../chunks/runtime.js";
import { a as displayWaitingTime, d as displayPriceInDollars } from "../../../../chunks/formater.js";
import { I as Info, W as Wallet, P as Popup } from "../../../../chunks/Popup.js";
import { S as Store, D as Dock, C as Clock_3 } from "../../../../chunks/store.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { B as Button } from "../../../../chunks/button.js";
import "../../../../chunks/stores.js";
const queueProgress$a = /* @__NO_SIDE_EFFECTS__ */ () => `pers. dans la file devant vous`;
const queueProgress$9 = /* @__NO_SIDE_EFFECTS__ */ () => `الناس أمامك`;
const queueProgress$8 = /* @__NO_SIDE_EFFECTS__ */ () => `people ahead of you`;
const queueProgress$7 = /* @__NO_SIDE_EFFECTS__ */ () => `gente delante de ti`;
const queueProgress$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपसे आगे के लोग`;
const queueProgress$5 = /* @__NO_SIDE_EFFECTS__ */ () => `persone davanti a te`;
const queueProgress$4 = /* @__NO_SIDE_EFFECTS__ */ () => `mensen vóór je`;
const queueProgress$3 = /* @__NO_SIDE_EFFECTS__ */ () => `pessoas à sua frente`;
const queueProgress$2 = /* @__NO_SIDE_EFFECTS__ */ () => `люди впереди тебя`;
const queueProgress$1 = /* @__NO_SIDE_EFFECTS__ */ () => `在你前面的人`;
const queueProgress = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: queueProgress$9,
    en: queueProgress$8,
    es: queueProgress$7,
    fr: queueProgress$a,
    hi: queueProgress$6,
    it: queueProgress$5,
    nl: queueProgress$4,
    pt: queueProgress$3,
    ru: queueProgress$2,
    zh: queueProgress$1
  }[options.languageTag ?? languageTag()]();
};
const Bell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
      }
    ],
    ["path", { "d": "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bell" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const SideSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sticky = true } = $$props;
  let { style = "" } = $$props;
  if ($$props.sticky === void 0 && $$bindings.sticky && sticky !== void 0) $$bindings.sticky(sticky);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  return `<div class="hidden lg:flex flex-col gap-6 items-center w-full"><div class="${[
    "flex flex-col items-center gap-12 w-full min-w-72 border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 " + escape(style, true),
    (sticky ? "sticky" : "") + " " + (sticky ? "top-16" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div></div>`;
});
const OverviewSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isBlackBackground;
  let isComingWithQueuePosition0;
  let { queuePosition } = $$props;
  let { queueInfo } = $$props;
  let { ticketStatus } = $$props;
  let { ticketProgress = 0 } = $$props;
  let { isExpectedTimeClose } = $$props;
  const proInfosByTicketStatus = {
    coming: {
      title: `${queueInfo.name} est occupé`,
      description: "Service en cours"
    },
    youAreNext: {
      title: "Vous êtes le prochain",
      description: "Merci de vous rendre au salon et de rester à proximité immédiate."
    },
    iminent: {
      title: "Vous êtes le prochain",
      description: "Merci de vous rendre au salon et de rester à proximité immédiate."
    },
    yourTurn: {
      title: "C’est à vous.",
      description: `${queueInfo.name} vous attends sur place.`
    },
    inProgress: {
      title: "Service en cours",
      description: "Installez-vous confortablement et détendez-vous."
    },
    done: {
      title: "Merci de votre confiance",
      description: "À très bientôt !"
    },
    isLate: {
      title: "Votre tour approche",
      description: "Service en cours"
    }
  };
  let proInfos = proInfosByTicketStatus[ticketStatus];
  if ($$props.queuePosition === void 0 && $$bindings.queuePosition && queuePosition !== void 0) $$bindings.queuePosition(queuePosition);
  if ($$props.queueInfo === void 0 && $$bindings.queueInfo && queueInfo !== void 0) $$bindings.queueInfo(queueInfo);
  if ($$props.ticketStatus === void 0 && $$bindings.ticketStatus && ticketStatus !== void 0) $$bindings.ticketStatus(ticketStatus);
  if ($$props.ticketProgress === void 0 && $$bindings.ticketProgress && ticketProgress !== void 0) $$bindings.ticketProgress(ticketProgress);
  if ($$props.isExpectedTimeClose === void 0 && $$bindings.isExpectedTimeClose && isExpectedTimeClose !== void 0) $$bindings.isExpectedTimeClose(isExpectedTimeClose);
  {
    proInfos = ["iminent", "youAreNext"].includes(ticketStatus) && !isExpectedTimeClose ? proInfosByTicketStatus["coming"] : proInfosByTicketStatus[ticketStatus];
  }
  isBlackBackground = ticketStatus === "yourTurn" || ticketStatus === "done";
  isComingWithQueuePosition0 = ticketStatus === "coming" && queuePosition === 0;
  return `<div class="${"" + escape(isBlackBackground ? "bg-primary" : "bg-white", true) + " p-4 flex rounded-2xl shadow-sm flex-col gap-2 w-full"}"><div class="flex gap-2"><img${add_attribute("src", queueInfo.avatar, 0)} class="rounded-full w-14 h-14" alt="profile"> <div class="flex flex-col w-full"><p class="${"font-bold text-lg " + escape(isBlackBackground ? "text-white" : "text-primary", true)}">${escape(proInfos?.title)}</p> <div class="flex gap-4 items-center justify-between w-full"><p class="${"text-xs " + escape(isBlackBackground ? "text-white" : "text-secondary", true)}">${escape(proInfos?.description)}</p>  ${["iminent, youAreNext"].includes(ticketStatus) && isExpectedTimeClose ? `<div class="rounded-full px-2.5 py-1.5 bg-neutral-200 flex justify-center items-center" data-svelte-h="svelte-syh2yc"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.16794 4C8.27254 4 9.16794 3.10457 9.16794 2C9.16794 0.89543 8.27254 0 7.16794 0C6.06344 0 5.16794 0.89543 5.16794 2C5.16794 3.10457 6.06344 4 7.16794 4ZM5.22074 4.60557C5.55204 4.43992 5.94784 4.47097 6.24924 4.68627L7.24924 5.40056C7.56734 5.6278 7.72384 6.01959 7.64994 6.40348L6.60114 11.847L11 18.4453C11.3063 18.9048 11.1822 19.5257 10.7226 19.8321C10.2631 20.1384 9.64224 20.0142 9.33594 19.5547L4.70954 12.6152L3.89405 11.3919C3.7513 11.1778 3.6966 10.9169 3.74132 10.6634L4.33784 7.28309L2.55258 8.1757L1.98076 11.0334C1.87239 11.575 1.34553 11.9261 0.80398 11.8178C0.26243 11.7094 -0.0887299 11.1825 0.0196301 10.641L0.68741 7.30379C0.74795 7.00123 0.94478 6.74356 1.22076 6.60557L5.22074 4.60557ZM10.8517 10.9487L7.97724 9.9905L8.35884 8.0096L11.4842 9.0513C12.0081 9.226 12.2913 9.7923 12.1166 10.3162C11.942 10.8402 11.3757 11.1234 10.8517 10.9487ZM0.29638 18.5097L3.56431 12.7001L3.87752 13.1699L4.80894 14.5669L2.03953 19.4903C1.76877 19.9716 1.15905 20.1423 0.6777 19.8716C0.19634 19.6008 0.0256201 18.9911 0.29638 18.5097Z" fill="black"></path></svg></div>` : ``}</div></div></div> ${ticketStatus !== "done" && ticketStatus !== "yourTurn" && !isComingWithQueuePosition0 ? `<div class="flex flex-col w-full justify-center bg-[#F7F7F7] rounded-lg p-4 gap-2"><div class="${"font-bold text-[#616163] flex gap-2 justify-between text-sm " + escape(ticketProgress ? "mb-2" : "", true)}">${ticketStatus === "inProgress" ? `Progression` : `<span class="text-[1.875rem] text-primary">${escape(queuePosition)}</span> <span class="self-end">${escape(/* @__PURE__ */ queueProgress())}</span> <span></span>`}</div> ${ticketProgress > -1 ? `<div class="h-4 w-full rounded-[6px] bg-[#DFE5E7] overflow-hidden"><div class="h-4 bg-[#616163]" style="${"width: " + escape(ticketProgress, true) + "%"}"></div></div> <p class="md:text-md text-xs text-secondary">${ticketStatus === "inProgress" ? `${escape(queueInfo.name)} débute sont service` : `${ticketProgress > 75 ? `Le client devant vous a bientôt fini` : `Progression du client devant vous`}`}</p>` : ``}</div>` : ``}</div>`;
});
const css = {
  code: ".pulse-wrapper.svelte-l0thby{align-self:flex-start;position:relative}.pulse-ring.svelte-l0thby{position:absolute;inset:0;border-radius:100%;animation:svelte-l0thby-pulse-border 2.3s ease-out infinite;pointer-events:none}@keyframes svelte-l0thby-pulse-border{0%{transform:scale(1);opacity:1}70%{transform:scale(2.2);opacity:0}100%{opacity:0}}",
  map: `{"version":3,"file":"ScheduleSection.svelte","sources":["ScheduleSection.svelte"],"sourcesContent":["<script lang=\\"ts\\">import SuccessIcon from \\"$lib/assets/icons/SuccessIcon.svelte\\";\\nimport { displayWaitingTime } from \\"$lib/formater\\";\\nimport * as m from \\"$lib/paraglide/messages.js\\";\\nimport { languageTag } from \\"$src/lib/paraglide/runtime\\";\\nimport { Bell, Clock3, Dock, InfoIcon, Store, Wallet } from \\"lucide-svelte\\";\\nexport let ticket;\\nexport let isTicketGeneratedByClient;\\nexport let prestation;\\nexport let ticketStatus;\\nexport let popupType;\\nexport let isCancelledOrProAbsent = false;\\nexport let theme;\\nexport let timeWithLateTime = null;\\nexport let isExpectedTimeClose = false;\\n$: ticketNumber = ticket.details.number;\\n$: expectedTime = timeWithLateTime ? displayWaitingTime(timeWithLateTime) : displayWaitingTime(new Date(ticket.expectedTime));\\nconst defaultStatusBadge = !ticket.details.left_to_pay ? \\"paid\\" : ticket.details.already_paid > 0 ? \\"acompte_verse\\" : \\"toPayOnPlace\\";\\nlet badgePaymentStatus = defaultStatusBadge;\\n$: badgePaymentStatus = ticket.status || defaultStatusBadge;\\nconst dataBadgePaiementByPaymentType = {\\n  acompte_verse: {\\n    text: \\"Acompte vers\\\\xE9\\",\\n    icon: Wallet\\n  },\\n  toPayOnPlace: {\\n    text: \\"\\\\xC0 regler sur place\\",\\n    icon: Store\\n  },\\n  paid: {\\n    text: \\"D\\\\xE9j\\\\xE0 pay\\\\xE9 en ligne\\",\\n    icon: Dock,\\n    bg: \\"bg-[#23BBAC]\\"\\n  }\\n};\\nconst dataBadgeInfosByStatus = {\\n  coming: { text: \\"Heure estim\\\\xE9e\\", icon: Clock3 },\\n  youAreNext: {\\n    text: \\"C'est bient\\\\xF4t \\\\xE0 vous\\",\\n    icon: Clock3,\\n    bg: \\"bg-[#00D4AA]\\",\\n    textColor: \\"text-white\\"\\n  },\\n  iminent: { text: \\"Passage imminent\\", icon: Bell, bg: \\"bg-[#00D4AA]\\", textColor: \\"text-white\\" },\\n  inProgress: { text: \\"Heure de fin estim\\\\xE9e\\", icon: Clock3 },\\n  yourTurn: null,\\n  isLate: { text: \\"Retard signal\\\\xE9\\", icon: Clock3, textColor: \\"text-[#FF834D]\\" }\\n};\\nconst bgByTheme = {\\n  NEUTRAL: \\"bg-primary\\",\\n  PINK: \\"bg-[#CF95FB]\\",\\n  CARDEN: \\"bg-[#0073FF]\\"\\n};\\nconst borderCardByTheme = {\\n  NEUTRAL: \\"border-primary\\",\\n  PINK: \\"border-[#CF95FB]\\",\\n  CARDEN: \\"border-[#0073FF]\\"\\n};\\nconst textColorByTheme = {\\n  NEUTRAL: \\"text-[#616163]\\",\\n  PINK: \\"text-[#CF95FB]\\",\\n  CARDEN: \\"text-[#0073FF]\\"\\n};\\nconst bgTicketNumberByTheme = {\\n  NEUTRAL: \\"bg-[#F7F7F7]\\",\\n  PINK: \\"bg-[#FFF5FA]\\",\\n  CARDEN: \\"bg-[#F8FAFD]\\"\\n};\\n$: isShowTextStatus = ticketStatus === \\"done\\" || ticketStatus === \\"cancelled\\" || ticketStatus === \\"cancelledByPro\\" || ticketStatus === \\"inProgress\\" || ticketStatus === \\"yourTurn\\";\\n$: badgePaymentInfos = dataBadgePaiementByPaymentType[badgePaymentStatus];\\nlet badgeInfosByStatus = dataBadgeInfosByStatus[ticketStatus];\\n$: badgeInfosByStatus = ticketStatus === \\"iminent\\" && !isExpectedTimeClose ? dataBadgeInfosByStatus[\\"coming\\"] : dataBadgeInfosByStatus[ticketStatus];\\n<\/script>\\n\\n<div\\n  class=\\"rounded-2xl shadow-sm bg-white overflow-clip w-full border-b-[6px] {borderCardByTheme[\\n    theme\\n  ]} p-4 md:p-6\\"\\n>\\n  <div class=\\"flex justify-between text-secondary-foreground items-center mb-4\\">\\n    <p\\n      class=\\"font-bold text-xs px-2 py-1 {bgTicketNumberByTheme[theme]} {textColorByTheme[\\n        theme\\n      ]} rounded-[5px]\\"\\n    >\\n      #{ticketNumber}\\n    </p>\\n\\n    <!-- Payment Badge -->\\n    {#if isTicketGeneratedByClient && badgePaymentInfos && !isCancelledOrProAbsent}\\n      <div\\n        class=\\"py-1 px-2 rounded-lg flex flex-row gap-1.5 items-center text-white {'bg' in\\n        badgePaymentInfos\\n          ? badgePaymentInfos.bg\\n          : bgByTheme[theme]}\\"\\n      >\\n        <svelte:component this={badgePaymentInfos.icon} size=\\"14\\" />\\n        <p class=\\"font-bold uppercase text-xs\\">{badgePaymentInfos.text}</p>\\n      </div>\\n    {/if}\\n  </div>\\n\\n  <div class=\\"flex flex-col items-center gap-6\\">\\n    <div class=\\"flex flex-col gap-2 items-center\\">\\n      <p class=\\"font-bold text-secondary uppercase text-sm\\">\\n        {new Date(ticket.expectedTime).toDateString() === new Date().toDateString()\\n          ? \\"Aujourd'hui\\"\\n          : new Date(ticket.expectedTime).toLocaleDateString(languageTag(), {\\n              weekday: \\"short\\",\\n              day: \\"numeric\\",\\n              month: \\"short\\",\\n            })}\\n      </p>\\n      <div class=\\"font-bold text-primary flex items-center justify-center gap-2 max-h-[60px] mb-2\\">\\n        <span class=\\" {isShowTextStatus ? 'text-[2.875rem]' : 'text-6xl'}\\">\\n          {#if ticketStatus === \\"done\\"}\\n            Terminé\\n          {:else if isCancelledOrProAbsent}\\n            Annulé\\n          {:else if ticketStatus === \\"inProgress\\"}\\n            En cours\\n          {:else if ticketStatus === \\"yourTurn\\"}\\n            Maintenant\\n          {:else}\\n            {expectedTime}\\n          {/if}\\n        </span>\\n        {#if ticketStatus === \\"coming\\" || ticketStatus === \\"youAreNext\\" || ticketStatus === \\"iminent\\"}\\n          <div class=\\"relative self-start\\">\\n            <div\\n              class=\\"pulse-ring border {theme === 'NEUTRAL'\\n                ? 'border-[#616163]'\\n                : borderCardByTheme[theme]}\\"\\n            ></div>\\n\\n            <div class=\\"p-1\\">\\n              <div\\n                class=\\" min-h-2 min-w-2 rounded-full {theme === 'NEUTRAL'\\n                  ? 'bg-[#616163]'\\n                  : bgByTheme[theme]}\\"\\n              />\\n            </div>\\n          </div>\\n        {/if}\\n      </div>\\n      {#if isTicketGeneratedByClient}\\n        {#if badgeInfosByStatus}\\n          <div\\n            class=\\" py-1 px-2 rounded-2xl {'bg' in badgeInfosByStatus\\n              ? \`\${badgeInfosByStatus.bg} \`\\n              : 'bg-[#DFE5E7] bg-opacity-30 '} {'textColor' in badgeInfosByStatus\\n              ? badgeInfosByStatus.textColor\\n              : textColorByTheme[theme]}   flex items-center gap-1\\"\\n          >\\n            <svelte:component this={badgeInfosByStatus.icon} size=\\"14\\" />\\n\\n            <p class=\\"text-xs font-extrabold uppercase {badgeInfosByStatus.textColor}\\">\\n              {badgeInfosByStatus.text}\\n            </p>\\n\\n            {#if ticketStatus === \\"inProgress\\"}\\n              <span class=\\"text-xs font-extrabold\\">\\n                {new Date(ticket.expectedTime).toLocaleTimeString(languageTag(), {\\n                  hour: \\"2-digit\\",\\n                  minute: \\"2-digit\\",\\n                })}\\n              </span>\\n            {/if}\\n          </div>\\n        {/if}\\n      {:else}\\n        <p class=\\"font-bold text-secondary uppercase text-sm\\">Horaire prévue</p>\\n      {/if}\\n    </div>\\n\\n    {#if isTicketGeneratedByClient && ticketStatus !== \\"yourTurn\\" && ticketStatus !== \\"inProgress\\" && ticketStatus !== \\"done\\" && !isCancelledOrProAbsent}\\n      <p class=\\"text-[#616163] text-xs flex items-center gap-1\\">\\n        Estimation dynamique liée à l’activité sur place <button\\n          on:click={() => (popupType = \\"HOUR_CHANGE\\")}\\n        >\\n          <InfoIcon size=\\"11\\" class=\\"min-w-[11px] cursor-pointer\\" />\\n        </button>\\n      </p>\\n    {/if}\\n\\n    <div class=\\"border w-full border-dashed border-[#DFE5E7]\\"></div>\\n    {#if prestation}\\n      <div class=\\"flex flex-col gap-2 items-center\\">\\n        <span class=\\"text-primary\\">{prestation.name}</span>\\n        <span class=\\"text-secondary\\">{prestation.duration} minutes</span>\\n      </div>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  .pulse-wrapper {\\n    align-self: flex-start;\\n    position: relative;\\n  }\\n\\n  .pulse-ring {\\n    position: absolute;\\n    inset: 0;\\n    border-radius: 100%;\\n    animation: pulse-border 2.3s ease-out infinite;\\n    pointer-events: none;\\n  }\\n\\n  @keyframes pulse-border {\\n    0% {\\n      transform: scale(1);\\n      opacity: 1;\\n    }\\n    70% {\\n      transform: scale(2.2);\\n      opacity: 0;\\n    }\\n    100% {\\n      opacity: 0;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmME,4BAAe,CACb,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,QACZ,CAEA,yBAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,0BAAY,CAAC,IAAI,CAAC,QAAQ,CAAC,QAAQ,CAC9C,cAAc,CAAE,IAClB,CAEA,WAAW,0BAAa,CACtB,EAAG,CACD,SAAS,CAAE,MAAM,CAAC,CAAC,CACnB,OAAO,CAAE,CACX,CACA,GAAI,CACF,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,OAAO,CAAE,CACX,CACA,IAAK,CACH,OAAO,CAAE,CACX,CACF"}`
};
const ScheduleSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ticketNumber;
  let expectedTime;
  let isShowTextStatus;
  let badgePaymentInfos;
  let { ticket } = $$props;
  let { isTicketGeneratedByClient } = $$props;
  let { prestation } = $$props;
  let { ticketStatus } = $$props;
  let { popupType } = $$props;
  let { isCancelledOrProAbsent = false } = $$props;
  let { theme } = $$props;
  let { timeWithLateTime = null } = $$props;
  let { isExpectedTimeClose = false } = $$props;
  const defaultStatusBadge = !ticket.details.left_to_pay ? "paid" : ticket.details.already_paid > 0 ? "acompte_verse" : "toPayOnPlace";
  let badgePaymentStatus = defaultStatusBadge;
  const dataBadgePaiementByPaymentType = {
    acompte_verse: { text: "Acompte versé", icon: Wallet },
    toPayOnPlace: {
      text: "À regler sur place",
      icon: Store
    },
    paid: {
      text: "Déjà payé en ligne",
      icon: Dock,
      bg: "bg-[#23BBAC]"
    }
  };
  const dataBadgeInfosByStatus = {
    coming: { text: "Heure estimée", icon: Clock_3 },
    youAreNext: {
      text: "C'est bientôt à vous",
      icon: Clock_3,
      bg: "bg-[#00D4AA]",
      textColor: "text-white"
    },
    iminent: {
      text: "Passage imminent",
      icon: Bell,
      bg: "bg-[#00D4AA]",
      textColor: "text-white"
    },
    inProgress: {
      text: "Heure de fin estimée",
      icon: Clock_3
    },
    yourTurn: null,
    isLate: {
      text: "Retard signalé",
      icon: Clock_3,
      textColor: "text-[#FF834D]"
    }
  };
  const bgByTheme = {
    NEUTRAL: "bg-primary",
    PINK: "bg-[#CF95FB]",
    CARDEN: "bg-[#0073FF]"
  };
  const borderCardByTheme = {
    NEUTRAL: "border-primary",
    PINK: "border-[#CF95FB]",
    CARDEN: "border-[#0073FF]"
  };
  const textColorByTheme = {
    NEUTRAL: "text-[#616163]",
    PINK: "text-[#CF95FB]",
    CARDEN: "text-[#0073FF]"
  };
  const bgTicketNumberByTheme = {
    NEUTRAL: "bg-[#F7F7F7]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]"
  };
  let badgeInfosByStatus = dataBadgeInfosByStatus[ticketStatus];
  if ($$props.ticket === void 0 && $$bindings.ticket && ticket !== void 0) $$bindings.ticket(ticket);
  if ($$props.isTicketGeneratedByClient === void 0 && $$bindings.isTicketGeneratedByClient && isTicketGeneratedByClient !== void 0) $$bindings.isTicketGeneratedByClient(isTicketGeneratedByClient);
  if ($$props.prestation === void 0 && $$bindings.prestation && prestation !== void 0) $$bindings.prestation(prestation);
  if ($$props.ticketStatus === void 0 && $$bindings.ticketStatus && ticketStatus !== void 0) $$bindings.ticketStatus(ticketStatus);
  if ($$props.popupType === void 0 && $$bindings.popupType && popupType !== void 0) $$bindings.popupType(popupType);
  if ($$props.isCancelledOrProAbsent === void 0 && $$bindings.isCancelledOrProAbsent && isCancelledOrProAbsent !== void 0) $$bindings.isCancelledOrProAbsent(isCancelledOrProAbsent);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.timeWithLateTime === void 0 && $$bindings.timeWithLateTime && timeWithLateTime !== void 0) $$bindings.timeWithLateTime(timeWithLateTime);
  if ($$props.isExpectedTimeClose === void 0 && $$bindings.isExpectedTimeClose && isExpectedTimeClose !== void 0) $$bindings.isExpectedTimeClose(isExpectedTimeClose);
  $$result.css.add(css);
  ticketNumber = ticket.details.number;
  expectedTime = timeWithLateTime ? displayWaitingTime(timeWithLateTime) : displayWaitingTime(new Date(ticket.expectedTime));
  badgePaymentStatus = ticket.status || defaultStatusBadge;
  isShowTextStatus = ticketStatus === "done" || ticketStatus === "cancelled" || ticketStatus === "cancelledByPro" || ticketStatus === "inProgress" || ticketStatus === "yourTurn";
  badgePaymentInfos = dataBadgePaiementByPaymentType[badgePaymentStatus];
  badgeInfosByStatus = ticketStatus === "iminent" && !isExpectedTimeClose ? dataBadgeInfosByStatus["coming"] : dataBadgeInfosByStatus[ticketStatus];
  return `<div class="${"rounded-2xl shadow-sm bg-white overflow-clip w-full border-b-[6px] " + escape(borderCardByTheme[theme], true) + " p-4 md:p-6 svelte-l0thby"}"><div class="flex justify-between text-secondary-foreground items-center mb-4"><p class="${"font-bold text-xs px-2 py-1 " + escape(bgTicketNumberByTheme[theme], true) + " " + escape(textColorByTheme[theme], true) + " rounded-[5px] svelte-l0thby"}">#${escape(ticketNumber)}</p>  ${isTicketGeneratedByClient && badgePaymentInfos && !isCancelledOrProAbsent ? `<div class="${"py-1 px-2 rounded-lg flex flex-row gap-1.5 items-center text-white " + escape(
    "bg" in badgePaymentInfos ? badgePaymentInfos.bg : bgByTheme[theme],
    true
  ) + " svelte-l0thby"}">${validate_component(badgePaymentInfos.icon || missing_component, "svelte:component").$$render($$result, { size: "14" }, {}, {})} <p class="font-bold uppercase text-xs">${escape(badgePaymentInfos.text)}</p></div>` : ``}</div> <div class="flex flex-col items-center gap-6"><div class="flex flex-col gap-2 items-center"><p class="font-bold text-secondary uppercase text-sm">${escape(new Date(ticket.expectedTime).toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? "Aujourd'hui" : new Date(ticket.expectedTime).toLocaleDateString(languageTag(), {
    weekday: "short",
    day: "numeric",
    month: "short"
  }))}</p> <div class="font-bold text-primary flex items-center justify-center gap-2 max-h-[60px] mb-2"><span class="${"" + escape(isShowTextStatus ? "text-[2.875rem]" : "text-6xl", true)}">${ticketStatus === "done" ? `Terminé` : `${isCancelledOrProAbsent ? `Annulé` : `${ticketStatus === "inProgress" ? `En cours` : `${ticketStatus === "yourTurn" ? `Maintenant` : `${escape(expectedTime)}`}`}`}`}</span> ${ticketStatus === "coming" || ticketStatus === "youAreNext" || ticketStatus === "iminent" ? `<div class="relative self-start"><div class="${"pulse-ring border " + escape(
    theme === "NEUTRAL" ? "border-[#616163]" : borderCardByTheme[theme],
    true
  ) + " svelte-l0thby"}"></div> <div class="p-1"><div class="${"min-h-2 min-w-2 rounded-full " + escape(theme === "NEUTRAL" ? "bg-[#616163]" : bgByTheme[theme], true) + " svelte-l0thby"}"></div></div></div>` : ``}</div> ${isTicketGeneratedByClient ? `${badgeInfosByStatus ? `<div class="${"py-1 px-2 rounded-2xl " + escape(
    "bg" in badgeInfosByStatus ? `${badgeInfosByStatus.bg} ` : "bg-[#DFE5E7] bg-opacity-30 ",
    true
  ) + " " + escape(
    "textColor" in badgeInfosByStatus ? badgeInfosByStatus.textColor : textColorByTheme[theme],
    true
  ) + " flex items-center gap-1 svelte-l0thby"}">${validate_component(badgeInfosByStatus.icon || missing_component, "svelte:component").$$render($$result, { size: "14" }, {}, {})} <p class="${"text-xs font-extrabold uppercase " + escape(badgeInfosByStatus.textColor, true) + " svelte-l0thby"}">${escape(badgeInfosByStatus.text)}</p> ${ticketStatus === "inProgress" ? `<span class="text-xs font-extrabold">${escape(new Date(ticket.expectedTime).toLocaleTimeString(languageTag(), { hour: "2-digit", minute: "2-digit" }))}</span>` : ``}</div>` : ``}` : `<p class="font-bold text-secondary uppercase text-sm" data-svelte-h="svelte-3zn5jr">Horaire prévue</p>`}</div> ${isTicketGeneratedByClient && ticketStatus !== "yourTurn" && ticketStatus !== "inProgress" && ticketStatus !== "done" && !isCancelledOrProAbsent ? `<p class="text-[#616163] text-xs flex items-center gap-1">Estimation dynamique liée à l’activité sur place <button>${validate_component(Info, "InfoIcon").$$render(
    $$result,
    {
      size: "11",
      class: "min-w-[11px] cursor-pointer"
    },
    {},
    {}
  )}</button></p>` : ``} <div class="border w-full border-dashed border-[#DFE5E7]"></div> ${prestation ? `<div class="flex flex-col gap-2 items-center"><span class="text-primary">${escape(prestation.name)}</span> <span class="text-secondary">${escape(prestation.duration)} minutes</span></div>` : ``}</div> </div>`;
});
const EvaluationSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ticket } = $$props;
  let { location } = $$props;
  let { ticketModules } = $$props;
  let { googlePlaceId = null } = $$props;
  let selectedStars = 0;
  if ($$props.ticket === void 0 && $$bindings.ticket && ticket !== void 0) $$bindings.ticket(ticket);
  if ($$props.location === void 0 && $$bindings.location && location !== void 0) $$bindings.location(location);
  if ($$props.ticketModules === void 0 && $$bindings.ticketModules && ticketModules !== void 0) $$bindings.ticketModules(ticketModules);
  if ($$props.googlePlaceId === void 0 && $$bindings.googlePlaceId && googlePlaceId !== void 0) $$bindings.googlePlaceId(googlePlaceId);
  return `<div class="flex flex-col p-4 justify-center bg-white rounded-2xl"><h3 class="font-bold text-lg" data-svelte-h="svelte-xmpfad">Évaluez votre expérience</h3> <span class="text-xs text-seoncdary">${escape(location.name)}</span> <div class="flex gap-1 mt-4 bg-[#F7F7F7] py-2 justify-center items-center rounded-lg">${each(Array(5), (_, i) => {
    return `<button class="${[
      "text-2xl transition-colors",
      (i < selectedStars ? "text-yellow-400" : "") + " " + (i >= selectedStars ? "text-[#D9D9D9]" : "")
    ].join(" ").trim()}" data-svelte-h="svelte-93gc06">★
      </button>`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let location;
  let theme;
  let now;
  let start;
  let workers;
  let locationStatus;
  let headerCover;
  let fullAddress;
  let prestation;
  let leftToPay;
  let isTicketGeneratedByClient;
  let nextTicket;
  let disabledDeleteButton;
  let isCancelledOrProAbsent;
  let scheduleSectionProps;
  let isExpectedTimeClose;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  let { data } = $$props;
  const locationSlug = data.location.location.id;
  let ticket = data.ticket;
  let popupType = null;
  let ticketStatus;
  let userTicketProgress = 0;
  let nextUserTicketProgress = 0;
  let timeWithLateTime = null;
  const evaluateTicketStatus = () => {
    let status = "coming";
    if (ticket.doneTime) {
      status = "done";
      return status;
    }
    if (ticket.canceledTime) {
      if (ticket.canceledByPro) {
        status = "cancelledByPro";
      } else {
        status = "cancelled";
      }
      return status;
    }
    if (calculateIfTicketIsLate()) {
      status = "isLate";
      return status;
    }
    if (data.queuePosition > 1) status = "coming";
    else if (data.queuePosition === 1) {
      if (nextUserTicketProgress && nextUserTicketProgress > 75) {
        status = "iminent";
      } else {
        status = "youAreNext";
      }
    } else if (data.queuePosition === 0) {
      const expected = new Date(ticket.expectedTime).getTime();
      const now2 = Date.now();
      const isTicketTurn = now2 >= expected - 5 * 60 * 1e3;
      if (ticket.startedTime) {
        status = "inProgress";
      } else if (isTicketTurn) {
        status = "yourTurn";
      } else {
        status = "coming";
      }
    }
    return status;
  };
  const getTicketStartTime = (ticket2) => {
    const expectedTime = new Date(ticket2.expectedTime).getTime();
    const startTime = ticket2.startedTime;
    const finalTime = startTime && new Date(startTime).getTime() < expectedTime ? new Date(startTime).getTime() : expectedTime;
    return finalTime;
  };
  const calculateIfTicketIsLate = () => {
    if (!data.queueLen) return false;
    const tickets = data.queueLen.filter((t) => t.id !== ticket.id && new Date(t.expectedTime).getTime() <= new Date(ticket.expectedTime).getTime());
    if (tickets.length === 0) return false;
    const lastTicket = tickets[tickets.length - 1];
    const timeToCheck = getTicketStartTime(lastTicket);
    const lastDuration = lastTicket.duration * 1e3;
    const lastEndTime = timeToCheck + lastDuration;
    if (lastEndTime > new Date(ticket.expectedTime).getTime()) {
      timeWithLateTime = new Date(lastEndTime);
      return true;
    }
    const firstTicket = tickets[0];
    const firstTicketTimeReference = getTicketStartTime(firstTicket);
    let totalTime = firstTicketTimeReference;
    for (const t of tickets) {
      const durationMs = t.duration * 1e3;
      totalTime += durationMs;
    }
    const expectedTicketTime = new Date(ticket.expectedTime).getTime();
    if (totalTime > expectedTicketTime) {
      timeWithLateTime = new Date(totalTime);
      return true;
    } else {
      timeWithLateTime = null;
      return false;
    }
  };
  const calculateProgressTicket = (ticket2) => {
    if (!now || !ticket2 || !ticket2.startedTime || !ticket2.durationS && !ticket2.duration) {
      return 0;
    }
    const currentTicket = ticket2;
    const startTime = new Date(currentTicket.startedTime);
    const durationSeconds = currentTicket.durationS || currentTicket.duration;
    const elapsedSeconds = (now.getTime() - startTime.getTime()) / 1e3;
    const progress = Math.min(elapsedSeconds / durationSeconds * 100, 100);
    if (progress < 0) return 0;
    return progress;
  };
  onDestroy(() => {
  });
  const checkExpectedTimeClose = () => {
    const time = new Date(ticket.expectedTime).getTime();
    const now2 = /* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime();
    const diffInMinutes = (time - now2) / (1e3 * 60);
    return diffInMinutes <= 30;
  };
  const mainBgColorByTheme = {
    CARDEN: "bg-[#F8FAFD]",
    NEUTRAL: "bg-[#F8FAFD]",
    PINK: "bg-gradient-to-b from-[#FAF5FF] via-[#FDF2F8] to-[#FFF1F2]"
  };
  const backgroundInfosCardByTheme = {
    CARDEN: "bg-[#C7E0FF]",
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]"
  };
  const bgPrimaryActionButtonByTheme = {
    CARDEN: "bg-[#0073FF]",
    NEUTRAL: "bg-primary",
    PINK: "bg-[#CF95FB]"
  };
  const borderActionButtonByTheme = {
    CARDEN: "border-[#0073FF]",
    NEUTRAL: "border-primary",
    PINK: "border-[#CF95FB]"
  };
  const textSecondaryActionButtonByTheme = {
    CARDEN: "text-[#0073FF]",
    NEUTRAL: "text-primary",
    PINK: "text-[#CF95FB]"
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      console.log("data", data);
    }
    location = data.location.location;
    theme = location.theme;
    now = new Date($clock);
    start = new Date(now.getTime() + 5 * 60 * 1e3);
    workers = computeQueue(data.location, now, start);
    locationStatus = getLocationStatus(workers);
    headerCover = location.banner ?? "/location-cover.webp";
    fullAddress = `${location.address}, ${location.zipCode}
        ${location.city}`;
    prestation = ticket.details.prestations[0];
    leftToPay = ticket.details.left_to_pay;
    isTicketGeneratedByClient = ticket.details.eticket;
    nextTicket = data.queueLen[data.queuePosition - 1];
    {
      userTicketProgress = calculateProgressTicket(ticket), nextUserTicketProgress = calculateProgressTicket(nextTicket);
    }
    {
      data.queuePosition, ticketStatus = evaluateTicketStatus();
    }
    disabledDeleteButton = ["yourTurn", "inProgress"].includes(ticketStatus);
    isCancelledOrProAbsent = ticketStatus === "cancelled" || ticketStatus === "cancelledByPro" || ticketStatus === "proAbsent";
    isExpectedTimeClose = checkExpectedTimeClose();
    scheduleSectionProps = {
      ticketStatus,
      ticket,
      prestation,
      isTicketGeneratedByClient,
      isCancelledOrProAbsent,
      theme,
      timeWithLateTime,
      isExpectedTimeClose
    };
    $$rendered = `<main class="${escape(mainBgColorByTheme[theme], true) + ""}">${validate_component(LocationHeader, "LocationHeader").$$render(
      $$result,
      {
        headerCover,
        location,
        locationStatus,
        theme,
        fullAddress
      },
      {},
      {}
    )} <div class="flex flex-row justify-between max-w-screen md:px-8 lg:px-12 xl:px-16 2xl:px-40 gap-8"><div class="w-full flex flex-col gap-8 md:gap-16 max-w-screen lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl px-4 mt-4">${ticketStatus !== "done" && ticketStatus !== "yourTurn" && ticketStatus !== "coming" && ticketStatus !== "youAreNext" && ticketStatus !== "iminent" ? `<div class="${"rounded-lg " + escape(backgroundInfosCardByTheme[theme], true) + " bg-opacity-30 p-4 text-[#616163] text-sm"}">${`${ticketStatus === "inProgress" ? `Informez vos proches de votre progression et horaire de fin en partageant votre ticket.` : `${ticketStatus === "cancelled" ? `Vous avez annulé votre réservation.` : `${ticketStatus === "cancelledByPro" ? `Le professionnel a annulé votre réservation. Contactez-le pour obtenir des explications.` : `${ticketStatus === "proAbsent" ? `Le professionnel a indiqué que vous êtiez absent. Contactez-le directement pour obtenir
            de l’aide ou des explications.` : `${ticketStatus === "isLate" ? `Une prestation a pris plus de temps que prévu, nous avons ajusté votre horaire de
            passage pour éviter de vous faire attendre sur place.
            <p class="uppercase font-bold text-sm text-[#A03203] mt-1">NOUVELLE ESTIMATION <span>${escape(timeWithLateTime ? displayWaitingTime(timeWithLateTime) : "")}</span></p>` : ``}`}`}`}`}`}</div>` : ``} ${data.queuePosition < 2 && !isCancelledOrProAbsent ? `${validate_component(OverviewSection, "OverviewSection").$$render(
      $$result,
      {
        ticketStatus,
        isExpectedTimeClose,
        queueInfo: data.queueInfo,
        queuePosition: data.queuePosition,
        ticketProgress: data.queuePosition === 0 ? userTicketProgress : nextUserTicketProgress
      },
      {},
      {}
    )}` : ``} ${ticketStatus === "done" ? `${validate_component(EvaluationSection, "EvaluationSection").$$render(
      $$result,
      {
        location,
        ticketModules: data.queueInfo.ticketModules,
        ticket,
        googlePlaceId: data.config.google_place_id
      },
      {},
      {}
    )}` : ``}  <div class="lg:hidden w-full">${validate_component(ScheduleSection, "ScheduleSection").$$render(
      $$result,
      Object.assign({}, scheduleSectionProps, { popupType }),
      {
        popupType: ($$value) => {
          popupType = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex justify-center flex-col items-center gap-4">${ticketStatus !== "done" && !isCancelledOrProAbsent ? `${validate_component(Button, "Button").$$render(
      $$result,
      {
        size: "sm",
        variant: "outline",
        class: " w-3/4 border " + (disabledDeleteButton ? "bg-[#DFE5E7] cursor-not-allowed border-[#DFE5E7] " : bgPrimaryActionButtonByTheme[theme]) + "  text-white  " + borderActionButtonByTheme[theme]
      },
      {},
      {
        default: () => {
          return `
            Annuler la réservation`;
        }
      }
    )}` : ``} ${ticketStatus !== "isLate" ? `${validate_component(Button, "Button").$$render(
      $$result,
      {
        href: "/" + locationSlug,
        size: "sm",
        variant: "outline",
        class: " w-3/4 " + (ticketStatus === "done" || isCancelledOrProAbsent ? ` ${bgPrimaryActionButtonByTheme[theme]}  text-white` : `bg-transparent ${textSecondaryActionButtonByTheme[theme]}`) + " border " + borderActionButtonByTheme[theme]
      },
      {},
      {
        default: () => {
          return `
            Nouvelle réservation`;
        }
      }
    )}` : ``}</div> ${data.queuePosition > 1 && !isCancelledOrProAbsent ? `${validate_component(OverviewSection, "OverviewSection").$$render(
      $$result,
      {
        isExpectedTimeClose,
        ticketStatus,
        queueInfo: data.queueInfo,
        queuePosition: data.queuePosition
      },
      {},
      {}
    )}` : ``}  ${leftToPay && !isCancelledOrProAbsent ? `<div class="bg-white p-4 flex items-center rounded-2xl shadow-sm -mt-2"><div class="flex justify-between gap-2 w-full font-bold text-sm text-primary"><div class="flex gap-2">${validate_component(Store, "Store").$$render($$result, { size: "18" }, {}, {})}<span class="" data-svelte-h="svelte-fbi89w">Reste à payer sur place</span></div> ${escape(displayPriceInDollars(leftToPay))}</div></div>` : ``} ${validate_component(ExternalLinks, "ExternalLinks").$$render($$result, { location, mode: "mobile" }, {}, {})} ${validate_component(LocationSection, "LocationSection").$$render($$result, { fullAddress, location }, {}, {})}      </div> ${validate_component(SideSection, "SideSection").$$render($$result, { sticky: true }, {}, {
      default: () => {
        return `${validate_component(ScheduleSection, "ScheduleSection").$$render(
          $$result,
          Object.assign({}, scheduleSectionProps, { popupType }),
          {
            popupType: ($$value) => {
              popupType = $$value;
              $$settled = false;
            }
          },
          {}
        )} `;
      }
    })}</div></main> ${validate_component(Popup, "Popup").$$render(
      $$result,
      { popupTypeOpen: popupType },
      {
        popupTypeOpen: ($$value) => {
          popupType = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
  } while (!$$settled);
  $$unsubscribe_clock();
  return $$rendered;
});
export {
  Page as default
};
