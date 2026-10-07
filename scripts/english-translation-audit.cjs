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
    const matches = files.filter(
        file => path.basename(file).toLowerCase() === `${locale}.json`,
    );

    if (!matches.length) {
        throw new Error(`${locale}.json was not found.`);
    }

    const preferred = matches.find(file =>
        /locales|translations|i18n/i.test(file),
    );

    return preferred || matches[0];
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

const missingInEnglish = arKeys.filter(
    key => !(key in enFlat),
);

const extraInEnglish = enKeys.filter(
    key => !(key in arFlat),
);

const emptyEnglish = enKeys.filter(key => {
    const value = enFlat[key];

    return (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && !value.trim())
    );
});

const arabicInsideEnglish = enKeys.filter(key => {
    const value = enFlat[key];

    return (
        typeof value === 'string' &&
        /[\u0600-\u06FF]/.test(value)
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

const whitespaceIssues = enKeys.filter(key => {
    const value = enFlat[key];

    return (
        typeof value === 'string' &&
        value.length > 0 &&
        value !== value.trim()
    );
});

const encodingIssues = enKeys.filter(key => {
    const value = enFlat[key];

    if (typeof value !== 'string') {
        return false;
    }

    return /�|Â|Ã|â€™|â€œ|â€|Ø|Ù/.test(value);
});

const suspiciousSameAsKey = enKeys.filter(key => {
    const value = enFlat[key];

    if (typeof value !== 'string') {
        return false;
    }

    const lastKeyPart = key
        .split('.')
        .pop()
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]/g, ' ')
        .toLowerCase()
        .trim();

    return value.toLowerCase().trim() === lastKeyPart;
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

sections.push('ENGLISH TRANSLATION AUDIT');
sections.push(`EN: ${path.relative(root, enPath)}`);
sections.push(`AR: ${path.relative(root, arPath)}`);
sections.push('');
sections.push(`English keys: ${enKeys.length}`);
sections.push(`Arabic keys:  ${arKeys.length}`);

addSection(
    'MISSING IN ENGLISH',
    missingInEnglish,
);

addSection(
    'EXTRA IN ENGLISH',
    extraInEnglish,
);

addSection(
    'EMPTY ENGLISH VALUES',
    emptyEnglish,
);

addSection(
    'ARABIC TEXT INSIDE ENGLISH',
    arabicInsideEnglish,
    key => `${key}: ${JSON.stringify(enFlat[key])}`,
);

addSection(
    'PLACEHOLDER MISMATCH',
    placeholderMismatch,
    key =>
        `${key}\n  EN: ${JSON.stringify(enFlat[key])}\n  AR: ${JSON.stringify(arFlat[key])}`,
);

addSection(
    'LEADING / TRAILING WHITESPACE',
    whitespaceIssues,
    key => `${key}: ${JSON.stringify(enFlat[key])}`,
);

addSection(
    'POSSIBLE ENCODING ISSUES',
    encodingIssues,
    key => `${key}: ${JSON.stringify(enFlat[key])}`,
);

addSection(
    'VALUE SAME AS KEY - REVIEW',
    suspiciousSameAsKey,
    key => `${key}: ${JSON.stringify(enFlat[key])}`,
);

const report = sections.join('\n');

console.log(report);

const reportPath = path.join(
    root,
    'english-translation-audit-report.txt',
);

fs.writeFileSync(reportPath, report, 'utf8');

console.log('');
console.log(
    `Report saved to: ${path.relative(root, reportPath)}`,
);

const hasCriticalIssues =
    missingInEnglish.length > 0 ||
    emptyEnglish.length > 0 ||
    arabicInsideEnglish.length > 0 ||
    placeholderMismatch.length > 0 ||
    encodingIssues.length > 0;

if (hasCriticalIssues) {
    process.exitCode = 1;
}