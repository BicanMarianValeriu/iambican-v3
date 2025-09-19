import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}

/**
 * isServer
 */
const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * isLocalhost
 */
const isLocalhost = Boolean(!isServer && (
    window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' || // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
));

/**
 * Convert date to human readable string
 * @param {object} param0 
 */
const humanDuration = ({ from, to = new Date().toDateString() }) => {
    const dateFrom = new Date(from), dateTo = new Date(to);

    const date1_UTC = new Date(Date.UTC(dateFrom.getUTCFullYear(), dateFrom.getUTCMonth(), dateFrom.getUTCDate()));
    const date2_UTC = new Date(Date.UTC(dateTo.getUTCFullYear(), dateTo.getUTCMonth(), dateTo.getUTCDate()));

    let yAppendix, mAppendix, dAppendix;

    const getDaysInMonths = (date) => {
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        const monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
        return monthLength;
    }

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

    return (years + yAppendix + ", " + months + mAppendix + ", și " + days + dAppendix);
};

/**
 * Parse data attrs
 * @param   {object/string} opts
 * @return  {object/string}
 */
const parseData = (opts) => {
    if (typeof (opts) == 'object') {
        return opts;
    } else if (typeof (opts) == 'string') {
        try {
            return JSON.parse(opts.replace(/'/g, '"').replace(';', ''));
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
const serializeData = function (data) {
    // Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    var str = "";
    for (var key in data) {
        if (str !== "") str += "&";
        str += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }
    return str;
};

/**
 * jsonP fetch
 * @param {object} data
 */
function jsonpFetch(url) {
    return new Promise((resolve, reject) => {
        const callbackName = `jsonp_callback_${Math.round(100000 * Math.random())}`;
        window[callbackName] = function (data) {
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        const script = document.createElement('script');
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
    cn
};