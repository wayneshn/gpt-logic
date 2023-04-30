const trimTrailingPunctuation = (text) => {
    if (/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(text.slice(-1))) {
        return text.slice(0, -1);
    } else {
        return text;
    }
};

module.exports = { trimTrailingPunctuation };
