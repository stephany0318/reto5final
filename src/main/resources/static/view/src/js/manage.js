export const USER = JSON.parse(sessionStorage.getItem("user"));

export const REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

export function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}

export function date() {
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();

    return y + "-" + m + "-" + d;
}

export function dateJson() {
    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth() + 1;
    let d = n.getDate();

    return {year: y, month: m, day: d};
}

export function dateFormatter(date) {
    let string = date.split("-");
    let y = string[0]
    let m = string[1]
    let d = string[2].substring(0, 2);
    return y + "-" + m + "-" + d;
}

