import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * isServer
 */
const isServer: boolean =
  !(typeof window !== "undefined" && window.document && window.document.createElement);

/**
 * isLocalhost
 */
const isLocalhost: boolean = Boolean(
  !isServer &&
  (
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  )
);

/**
 * Convert date to human readable string
 * @param {object} param0 
 */
type HumanDurationParams = {
  from: string | number | Date,
  to?: string | number | Date
};

const humanDuration = ({ from, to = new Date().toDateString() }: HumanDurationParams): string => {
  const dateFrom = new Date(from), dateTo = new Date(to);

  const date1_UTC = new Date(Date.UTC(dateFrom.getUTCFullYear(), dateFrom.getUTCMonth(), dateFrom.getUTCDate()));
  const date2_UTC = new Date(Date.UTC(dateTo.getUTCFullYear(), dateTo.getUTCMonth(), dateTo.getUTCDate()));

  let yAppendix: string, mAppendix: string, dAppendix: string;

  const getDaysInMonths = (date: Date): number => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const monthLength = (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24);
    return monthLength;
  };

  let days = date2_UTC.getDate() - date1_UTC.getDate();
  if (days < 0) {
    date2_UTC.setMonth(date2_UTC.getMonth() - 1);
    days += getDaysInMonths(date2_UTC);
  }

  let months = date2_UTC.getMonth() - date1_UTC.getMonth();
  if (months < 0) {
    date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
    months += 12;
  }

  let years = date2_UTC.getFullYear() - date1_UTC.getFullYear();
  yAppendix = years > 1 ? " ani" : " an";
  mAppendix = months > 1 ? " luni" : " lună";
  dAppendix = days > 1 ? " zile" : " zi";

  return years + yAppendix + ", " + months + mAppendix + ", și " + days + dAppendix;
};

/**
 * Parse data attrs
 * @param   {object|string} opts
 * @return  {object|string}
 */
const parseData = (opts: object | string): object | string => {
  if (typeof opts === "object") {
    return opts;
  } else if (typeof opts === "string") {
    try {
      return JSON.parse(opts.replace(/'/g, '"').replace(/;/g, ""));
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
};

/**
 * Create String as params from formData
 * @param {object} data
 */
const serializeData = function (data: Record<string, any>): string {
  // Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
  let str = "";
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (str !== "") str += "&";
      str += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }
  }
  return str;
};

/**
 * jsonP fetch
 * @param {string} url
 */
function jsonpFetch(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;
    // @ts-ignore
    (window as any)[callbackName] = function (data: any) {
      // @ts-ignore
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    const script = document.createElement("script");
    script.src = `${url}&c=${callbackName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export {
  isServer,
  isLocalhost,
  parseData,
  serializeData,
  humanDuration,
  jsonpFetch,
  cn,
};