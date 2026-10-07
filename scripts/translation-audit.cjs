const fs = require('fs');
const path = require('path');

const root = process.cwd();
const src = path.join(root, 'src');

function getJsonFiles(directory) {
    const result = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            result.push(...getJsonFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            result.push(fullPath);
        }
    }

    return result;
}

function findLocaleFile(files, locale) {
    const exact = files.filter(
        file => path.basename(file).toLowerCase() === `${locale}.json`,
    );

    if (!exact.length) {
        throw new Error(`${locale}.json was not found.`);
    }

    const preferred = exact.find(file =>
        /locales|translations|i18n/i.test(file),
    );

    return preferred || exact[0];
}

function flatten(value, prefix = '', result = {}) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            flatten(
                item,
                prefix ? `${prefix}.${index}` : String(index),
                result,
            );
        });

        return result;
    }

    if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, item]) => {
            const nextKey = prefix ? `${prefix}.${key}` : key;
            flatten(item, nextKey, result);
        });

        return result;
    }

    result[prefix] = value;
    return result;
}

function placeholders(value) {
    if (typeof value !== 'string') {
        return [];
    }

    return [
        ...value.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g),
    ]
        .map(match => match[1].trim())
        .sort();
}

function sameArray(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

const files = getJsonFiles(src);

const enPath = findLocaleFile(files, 'en');
const arPath = findLocaleFile(files, 'ar');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

const enFlat = flatten(en);
const arFlat = flatten(ar);

const enKeys = Object.keys(enFlat);
const arKeys = Object.keys(arFlat);

const missingInArabic = enKeys.filter(
    key => !(key in arFlat),
);

const extraInArabic = arKeys.filter(
    key => !(key in enFlat),
);

const emptyArabic = arKeys.filter(key => {
    const value = arFlat[key];

    return (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && !value.trim())
    );
});

const placeholderMismatch = enKeys
    .filter(key => key in arFlat)
    .filter(key => {
        return !sameArray(
            placeholders(enFlat[key]),
            placeholders(arFlat[key]),
        );
    });

const sameAsEnglish = enKeys
    .filter(key => key in arFlat)
    .filter(key => {
        const enValue = enFlat[key];
        const arValue = arFlat[key];

        return (
            typeof enValue === 'string' &&
            typeof arValue === 'string' &&
            enValue.trim() &&
            enValue.trim() === arValue.trim()
        );
    });

const latinOnlyArabic = arKeys.filter(key => {
    const value = arFlat[key];

    if (typeof value !== 'string' || !value.trim()) {
        return false;
    }

    const hasArabic = /[\u0600-\u06FF]/.test(value);
    const hasEnglish = /[A-Za-z]/.test(value);

    return hasEnglish && !hasArabic;
});

const sections = [];

function addSection(title, items, formatter = item => item) {
    sections.push('');
    sections.push(`===== ${title} (${items.length}) =====`);

    if (!items.length) {
        sections.push('None');
        return;
    }

    items.forEach(item => {
        sections.push(formatter(item));
    });
}

sections.push('TRANSLATION AUDIT');
sections.push(`EN: ${path.relative(root, enPath)}`);
sections.push(`AR: ${path.relative(root, arPath)}`);
sections.push('');
sections.push(`English keys: ${enKeys.length}`);
sections.push(`Arabic keys:  ${arKeys.length}`);

addSection(
    'MISSING IN ARABIC',
    missingInArabic,
);

addSection(
    'EXTRA IN ARABIC',
    extraInArabic,
);

addSection(
    'EMPTY ARABIC VALUES',
    emptyArabic,
);

addSection(
    'PLACEHOLDER MISMATCH',
    placeholderMismatch,
    key =>
        `${key}\n  EN: ${JSON.stringify(enFlat[key])}\n  AR: ${JSON.stringify(arFlat[key])}`,
);

addSection(
    'SAME AS ENGLISH - REVIEW',
    sameAsEnglish,
    key =>
        `${key}: ${JSON.stringify(arFlat[key])}`,
);

addSection(
    'LATIN-ONLY ARABIC VALUES - REVIEW',
    latinOnlyArabic,
    key =>
        `${key}: ${JSON.stringify(arFlat[key])}`,
);

const report = sections.join('\n');

console.log(report);

const reportPath = path.join(
    root,
    'translation-audit-report.txt',
);

fs.writeFileSync(reportPath, report, 'utf8');

console.log('');
console.log(
    `Report saved to: ${path.relative(root, reportPath)}`,
);

const hasCriticalIssues =
    missingInArabic.length > 0 ||
    emptyArabic.length > 0 ||
    placeholderMismatch.length > 0;

if (hasCriticalIssues) {
    process.exitCode = 1;
}