"use strict";
// SPDX-License-Identifier: 0BSD

const timeoutIds = {};
let wordListModule = null;

async function loadWordList() {
    if (!wordListModule) {
        wordListModule = await import("/scripts/get-word-list.js");
    }
    return wordListModule.getWordList;
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
    if (timeoutIds[name]) {
        clearTimeout(timeoutIds[name]);
    }
    timeoutIds[name] = setTimeout(
        () => {
            text.textContent = oldText;
            image.src = `/images/${name}.svg`;
            delete timeoutIds[name];
        }, 2000
    );
}

function changeVisibility() {
    const image = document.getElementById("image-visibility");
    const input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
        image.src = "/images/hide.svg";
        image.alt = "Hide"
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
    const buffer = new Uint32Array(1);
    const limit = 2**32 - (2**32 % max);
    let randomNumber;
    do {
        randomNumber = window.crypto.getRandomValues(buffer)[0];
    } while (randomNumber >= limit);
    return randomNumber % max;
}

function getEntropyAmount(passwordLength, charsetLength) {
    return Math.floor(passwordLength * Math.log2(charsetLength));
}

async function generatePassword(
    passwordLength,
    usePunctuation,
    usePassphrase,
    customChars
) {
    let separator = ".";
    let rawPassword = [];
    let charsetLength = 0;
    if (usePassphrase) {
        const getWordList = await loadWordList();
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

async function displayPassword(clicked) {
    const passwordLength = Number(getValue("length"));
    const usePassphrase = Boolean(getChecked("use-passphrase"));
    const usePunctuation = Boolean(getChecked("use-punctuation"));
    const customChars = getValue("custom-chars");

    if (passwordLength < 4) {
        return
    }
    const passwordData = await generatePassword(
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
    document.getElementById("generate-password")
        .addEventListener("click", () => displayPassword(true));
    document.getElementById("copy-password")
        .addEventListener("click", copy);
    document.getElementById("change-password-visibility")
        .addEventListener("click", changeVisibility);
    displayPassword(false);
}

document.addEventListener("DOMContentLoaded", main);
