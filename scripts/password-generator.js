"use strict";
// SPDX-License-Identifier: 0BSD

const timeouts = {};

function getWordList() {
    const wordList = [
        "the", "and", "was", "for", "his", "are", "had", "has", "its",
        "she", "new", "one", "her", "who", "but", "not", "two", "all", "may",
        "him", "out", "can", "war", "won", "end", "use", "due", "amp", "now",
        "day", "age", "did", "any", "set", "own", "law", "led", "art", "cup",
        "son", "top", "old", "air", "off", "six", "way", "act", "you", "few",
        "win", "men", "man", "san", "per", "run", "red", "how", "see", "sea",
        "get", "ten", "car", "via", "big", "saw", "los", "bay", "put", "too",
        "met", "low", "far", "hit", "ran", "our", "van", "sir", "era", "got",
        "key", "oil", "ice", "cvv", "god", "lee", "yet", "hot", "cut", "gas",
        "job", "von", "sun", "bus", "bbc", "pay", "del", "tom", "bar", "pop",
        "box", "boy", "tax", "joe", "inc", "gun", "sex", "say", "usa", "fox",
        "bad", "lot", "etc", "aid", "com", "bob", "let", "jim", "nfl", "des",
        "why", "sri", "dam", "die", "ali", "try", "eye", "ben", "don", "pro",
        "dry", "sam", "row", "web", "ltd", "dvd", "map", "leg", "der", "nor",
        "ray", "ceo", "max", "dog", "kim", "sky", "gay", "las", "ago", "mrs",
        "rio", "dan", "dna", "fan", "nba", "arm", "net", "fly", "abc", "ibn",
        "tim", "ban", "jan", "duo", "nhl", "oak", "ann", "les", "mix", "lay",
        "buy", "cbs", "tie", "roy", "guy", "aim", "gap", "bit", "phd", "fit",
        "bid", "ian", "pan", "tag", "ref", "add", "lap", "raf", "nbc", "mac",
        "hip", "ill", "mid", "raw", "cap", "fee", "bed", "fun", "cat", "tea",
        "uss", "abu", "lie", "jay", "sat", "rev", "ken", "sum", "leo", "ski",
        "han", "cdp", "bin", "ask", "hms", "inn", "ron", "jon", "pit", "hop",
        "liu", "rob", "eve", "ted", "eat", "tip", "wet", "lab", "jet", "bce",
        "pat", "mtv", "ram", "arc", "sox", "hub", "afc", "afl", "vii", "bow",
        "app", "bat", "fed", "mlb", "sit", "zoo", "joy", "und", "fbi", "egg",
        "kid", "pen", "hat", "hiv", "den", "fat", "vol", "amy", "wwe", "ibm",
        "rap", "cox", "mad", "ash", "kit", "spy", "nsw", "col", "atp", "ore",
        "ion", "lit", "log", "mps", "ace", "ufc", "www", "rod", "das", "gen",
        "dos", "jam", "odd", "cia", "sin", "llc", "tin", "org", "pub", "tel",
        "sec", "ana", "pet", "fur", "toy", "utc", "mud", "bag", "mvp", "yes",
        "bee", "rao", "rna", "sue", "fin", "uci", "vfl", "ear", "tan", "mar",
        "itv", "ham", "lok", "mit", "mhz", "lou", "wei", "eva", "rbi", "jin",
        "chi", "rpm", "rey", "cao", "mob", "cry", "gdp", "ira", "sad", "non",
        "raj", "aka", "icc", "fcc", "hay", "iso", "rat", "pga", "mls", "sur",
        "bet", "pin", "pot", "spa", "hbo", "lin", "mph", "kay", "gym", "cbc",
        "cnn", "rex", "rca", "bmw", "min", "dot", "con", "pbs", "rim", "phi",
        "est", "cal", "usc", "ivy", "crc", "cow", "goa", "ink", "pig", "acc",
        "dee", "bye", "fix", "sen", "rue", "jaw", "tai", "xii", "cab", "yan",
        "nhs", "plc", "emi", "vic", "hal", "sub", "nrl", "ads", "mgm", "uae",
        "wta", "ios", "owl", "par", "cds", "hut", "rai", "dei", "fog", "dug",
        "hon", "wwf", "mel", "var", "zhu", "aft", "doc", "mba", "fda", "ole",
        "cum", "rfc", "usd", "shi", "tap", "val", "liz", "odi", "mir", "sda",
        "chu", "lip", "hua", "rms", "tcp", "udp", "dns", "ftp", "ssh", "ssl",
        "tls", "vpn", "lan", "wan", "arp", "nat", "url", "cpu", "gpu", "hdd",
        "ssd", "usb", "vga", "dvi", "nas", "lcd", "ide", "api", "sdk", "gui",
        "cli", "php", "sql", "xml", "css", "jvm", "dll", "exe", "oop", "git",
        "vim", "drm", "csv", "soc", "ips", "aes", "aws", "vds", "osi", "koi",
        "utf", "jdk", "jre", "aac", "apk", "avi", "asm", "awk", "txt", "jpg",
        "png", "foo", "bak", "pdf", "psk", "wep", "wpa", "bmp", "cpp", "gsm",
        "cmd", "lte", "deb", "dnf", "dng", "pkg", "apt", "adb", "efi", "zip",
        "zst", "gpg", "lzo", "lzw", "lua", "ogg", "mov", "msi", "ndk", "neo",
        "nfc", "nft", "obj", "rar", "gif", "rsa", "pgp", "sfx", "sig", "tar",
        "taz", "tbz", "tgz", "txz", "vbr", "crf", "wav", "wma", "wps", "xls",
        "yml", "ppt", "bsd", "isc", "gpl", "mpl", "sil", "sed", "sfw", "eng",
        "rus", "jap", "mot", "alt", "gov", "dpi", "nsa", "kgb", "mvd", "pix",
        "lto", "ado", "zig", "lms", "ppa", "srv", "dev", "mnt", "sys", "tmp",
        "sus", "sas", "ttf", "dex", "oga", "aga", "mkv"
    ];
    return wordList;
}

function getChecked(id) {
    return document.getElementById(id).checked;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function buttonDone(name, main, newText, oldText) {
    const text = document.getElementById("text-" + name);
    const image = document.getElementById("image-" + name);
    text.textContent = newText;
    const prefix = main ? "main" : "sub";
    image.src = `/images/${prefix}-done.svg`;
    if (timeouts[name]) {
        clearTimeout(timeouts[name]);
    }
    timeouts[name] = setTimeout(
        () => {
            text.textContent = oldText;
            image.src = `/images/${name}.svg`;
            delete timeouts[name];
        }, 2000
    );
}

function changeVisibility() {
    const image = document.getElementById("image-visibility");
    const input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
        image.src = "/images/hide.svg";
        image.alt = "Hide";
    } else {
        input.type = "password";
        image.src = "/images/show.svg";
        image.alt = "Show";
    }
}

function copy() {
    const password = getValue("password");
    navigator.clipboard.writeText(password);
    buttonDone("copy", false, "Copied", "Copy");
}

function getRandomChoice(item) {
    const randomNumber = getRandomNumber(item.length);
    return item[randomNumber];
}

function randomShuffle(item) {
    for (let i = item.length - 1; i > 0; i--) {
        const j = getRandomNumber(i + 1);
        [item[i], item[j]] = [item[j], item[i]];
    }
    return item;
}

function getRandomNumber(max) {
    const maxUint32 = 4294967296;
    if (max < 1 || max > maxUint32) {
        return;
    }
    const buffer = new Uint32Array(1);
    const limit = maxUint32 - (maxUint32 % max) - 1;
    let randomNumber = 0;
    // Return an unbiased number
    do {
        randomNumber = window.crypto.getRandomValues(buffer)[0];
    } while (randomNumber > limit);
    return randomNumber % max;
}

function getEntropyAmount(passwordLength, charsetLength) {
    return Math.floor(passwordLength * Math.log2(charsetLength));
}

function generatePassword(
    passwordLength,
    usePunctuation,
    usePassphrase,
    customChars
) {
    let separator = ".";
    let rawPassword = [];
    let charsetLength = 0;
    if (usePassphrase) {
        const charset = getWordList();
        charsetLength = charset.length;
        for (let i = 0; i < passwordLength; i++) {
            rawPassword.push(getRandomChoice(charset));
        }
    } else {
        const chars = {
            punctuation: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            digits: "0123456789"
        };
        const charsets = [
            usePunctuation ? chars.punctuation : "",
            customChars ? customChars : "",
            chars.lowercase,
            chars.uppercase,
            chars.digits
        ].filter(Boolean);
        const requiredChars = charsets.map(
            charset => getRandomChoice(charset)
        );
        const charset = [...new Set(charsets.join(""))];
        charsetLength = charset.length;
        const extraLength = passwordLength - requiredChars.length;
        const randomChars = [];
        for (let i = 0; i < extraLength; i++) {
            randomChars.push(getRandomChoice(charset));
        }
        rawPassword = [...requiredChars, ...randomChars];
        randomShuffle(rawPassword);
        separator = "";
    }
    const password = rawPassword.join(separator);
    return [password, charsetLength];
}

function displayPassword(clicked) {
    const passwordLength = Number(getValue("length"));
    const usePassphrase = Boolean(getChecked("use-passphrase"));
    const usePunctuation = Boolean(getChecked("use-punctuation"));
    const customChars = getValue("custom-chars");

    if (passwordLength < 4) {
        return;
    }
    const passwordData = generatePassword(
        passwordLength,
        usePunctuation,
        usePassphrase,
        customChars
    );
    const password = passwordData[0];
    const charsetLength = passwordData[1];
    const entropy = String(getEntropyAmount(passwordLength, charsetLength))
    const entropyText = "Entropy: " + entropy + " bits";
    document.getElementById("password").value = password;
    document.getElementById("password-entropy").textContent = entropyText;
    document.getElementById("password-length").textContent
        = "Length: " + password.length;
    if (clicked) {
        buttonDone("generate", true, "Regenerated", "Regenerate");
    }
}

function main() {
    displayPassword(false);
    document.getElementById("generate-password")
        .addEventListener("click", () => displayPassword(true));
    document.getElementById("copy-password")
        .addEventListener("click", copy);
    document.getElementById("change-password-visibility")
        .addEventListener("click", changeVisibility);
}

document.addEventListener("DOMContentLoaded", main);
