const formatRxpSearch =/\W|\s/g;
const formatTextRxp =/\w+|\s+/gi;
const replaceChar ="";
const joinString = " ";

export const formatSearch = (s,rxp = formatRxpSearch, char = replaceChar) => {
    return s.toLowerCase().replace(rxp, char);
};

export const formatText = (s,rxp = formatTextRxp) => {
    return !!s ? s.toLowerCase().match(rxp) : s;
};

export const capitalizeFirstLetter = (s) => {
    const str = formatText(s,formatTextRxp,replaceChar);
    const spl = str.map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    });
    return spl.join(joinString);
};