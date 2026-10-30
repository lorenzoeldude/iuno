
const API_URL = "https://iunoni-api.onrender.com";

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]);
}

function upsertMeta(html, attribute, key, content) {
    const pattern = new RegExp(
        `<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`,
        "i"
    );

    const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`;

    if (pattern.test(html)) {
        return html.replace(pattern, tag);
    }

    return html.replace("</head>", `${tag}\n</head>`);
}

function upsertCanonical(html, url) {
    const pattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i;
    const tag = `<link rel="canonical" href="${escapeHtml(url)}">`;

    if (pattern.test(html)) {
        return html.replace(pattern, tag);
    }

    return html.replace("</head>", `${tag}\n</head>`);
}

function renderDictionaryEntry(data, word) {
    const lemma = data.lemma;

    const principalParts = {
        verb: [
            lemma.lemma,
            lemma.infinitive,
            lemma.perfect,
            lemma.supine,
        ],
        adjective: [
            lemma.lemma,
            lemma.feminine,
            lemma.neuter,
        ],
        noun: [
            lemma.lemma,
            lemma.genitive,
        ],
    }[lemma.part_of_speech] || [lemma.lemma];

    const meanings = (data.meanings || [])
        .map(item => `
            <li>
                ${item.governs_case
                    ? `<strong>+${escapeHtml(item.governs_case)}:</strong> `
                    : ""}
                ${escapeHtml(item.meaning)}
            </li>
        `)
        .join("");

    const definition = data.definitions?.[0]?.definition;

    const examples = (data.examples || [])
        .map(example => `<li>${escapeHtml(example.latin)}</li>`)
        .join("");

    const derivatives = (data.derivatives || [])
        .map(item => `<li>${escapeHtml(item.derivative)}</li>`)
        .join("");

    const metadata = [
        lemma.part_of_speech,
        lemma.gender,
        lemma.declension ? `${lemma.declension}. declension` : null,
        lemma.conjugation ? `${lemma.conjugation}. conjugation` : null,
    ].filter(Boolean);

    return `
        <main id="seo-prerender" data-word="${escapeHtml(word)}">
            <nav>
                <a href="https://www.iunoni.com/">IUNONI</a>
                <span> · Latin Dictionary</span>
            </nav>

            <header>
                <h1>${escapeHtml(lemma.lemma)}</h1>

                <p class="entry-forms">
                    ${principalParts.filter(Boolean).map(escapeHtml).join(", ")}
                </p>

                <ul class="entry-meanings">
                    ${meanings}
                </ul>

                <p class="entry-meta">
                    ${metadata.map(escapeHtml).join(" · ")}
                </p>
            </header>

            ${definition ? `
                <section>
                    <h2>Definition</h2>
                    <p>${escapeHtml(definition)}</p>
                </section>
            ` : ""}

            ${examples ? `
                <section>
                    <h2>Examples</h2>
                    <ul>${examples}</ul>
                </section>
            ` : ""}

            ${derivatives ? `
                <section>
                    <h2>English Derivatives</h2>
                    <ul>${derivatives}</ul>
                </section>
            ` : ""}
        </main>
    `;
}

function addPrerenderStyles(html) {
    const styles = `
        <style>
            #seo-prerender {
                width: min(90%, 1100px);
                margin: 50px auto;
                padding-bottom: 60px;
                font-family: Arial, sans-serif;
                line-height: 1.7;
                color: #222;
            }

            #seo-prerender h1 {
                font-size: 2.5rem;
                margin-bottom: 0;
            }

            #seo-prerender h2 {
                margin-top: 2rem;
            }

            #seo-prerender .entry-forms {
                font-size: 1.2rem;
            }

            #seo-prerender .entry-meanings {
                font-size: 1.2rem;
            }

            #seo-prerender .entry-meta {
                color: #666;
            }

            #seo-prerender:not(:empty) ~ #root {
                display: none !important;
            }
        </style>
    `;

    return html.replace("</head>", `${styles}\n</head>`);
}

function makeResponse(body, originalResponse, status = originalResponse.status) {
    const headers = new Headers(originalResponse.headers);

    headers.set("Content-Type", "text/html; charset=utf-8");

    headers.delete("Content-Length");
    headers.delete("Content-Encoding");
    headers.delete("ETag");

    if (status !== originalResponse.status) {
        headers.set("Cache-Control", "no-store");
    }

    return new Response(body, {
        status,
        headers,
    });
}

function renderErrorPage(title, message, word) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | IUNONI</title>
    <meta name="robots" content="noindex">
</head>
<body style="font-family: Arial, sans-serif; max-width: 700px; margin: 80px auto; padding: 0 24px; line-height: 1.6; color: #222;">
    <nav>
        <a href="https://www.iunoni.com/">IUNONI</a>
        <span> · Latin Dictionary</span>
    </nav>

    <main>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(message)}</p>
        <p>Search for another Latin word in the <a href="https://www.iunoni.com/dictionary">IUNONI dictionary</a>.</p>
    </main>
</body>
</html>`;
}

export async function onRequest(context) {
    const originalResponse = await context.next();
    const originalHtml = await originalResponse.text();

    const word = context.params.word;

    let apiResponse;

    try {
        apiResponse = await fetch(
            `${API_URL}/api/word/${encodeURIComponent(word)}`
        );
    } catch (error) {
        console.error("Dictionary API request failed:", error);

        return makeResponse(
            renderErrorPage(
                "Dictionary temporarily unavailable",
                "We couldn't load this dictionary entry. Please try again later.",
                word
            ),
            originalResponse,
            502
        );
    }

    if (apiResponse.status === 404) {
        return makeResponse(
            renderErrorPage(
                "Word not found",
                `We couldn't find "${word}" in the IUNONI Latin dictionary.`,
                word
            ),
            originalResponse,
            404
        );
    }

    if (!apiResponse.ok) {
        console.error(
            "Dictionary API returned an error:",
            apiResponse.status
        );

        return makeResponse(
            renderErrorPage(
                "Dictionary temporarily unavailable",
                "We couldn't load this dictionary entry. Please try again later.",
                word
            ),
            originalResponse,
            502
        );
    }

    let data;

    try {
        data = await apiResponse.json();
    } catch (error) {
        console.error("Invalid dictionary API response:", error);

        return makeResponse(
            renderErrorPage(
                "Dictionary temporarily unavailable",
                "We couldn't load this dictionary entry. Please try again later.",
                word
            ),
            originalResponse,
            502
        );
    }

    if (!data?.lemma?.lemma) {
        console.error("Dictionary API returned unexpected data:", word);

        return makeResponse(
            renderErrorPage(
                "Dictionary temporarily unavailable",
                "We couldn't load this dictionary entry. Please try again later.",
                word
            ),
            originalResponse,
            502
        );
    }

    try {
        const lemma = data.lemma;
        const title = `${lemma.lemma} – Latin Dictionary | IUNONI`;

        const meanings = (data.meanings || [])
            .map(item => item.meaning)
            .filter(Boolean)
            .join(", ");

        const description = meanings
            ? `Learn the meaning, forms, and usage of ${lemma.lemma} in Latin. Meanings include ${meanings}. Explore grammar, examples, and derivatives.`
            : `Learn the meaning, forms, and usage of ${lemma.lemma} in Latin. Explore grammar, examples, and derivatives.`;

        const canonicalUrl =
            `https://www.iunoni.com/dictionary/${encodeURIComponent(lemma.lemma_normalized)}`;

        let html = originalHtml;

        html = html.replace(
            /<title>[\s\S]*?<\/title>/i,
            `<title>${escapeHtml(title)}</title>`
        );

        html = upsertMeta(html, "name", "description", description);
        html = upsertMeta(html, "property", "og:title", title);
        html = upsertMeta(html, "property", "og:description", description);
        html = upsertMeta(html, "property", "og:url", canonicalUrl);
        html = upsertMeta(html, "property", "og:type", "website");
        html = upsertMeta(html, "property", "og:site_name", "IUNONI");
        html = upsertMeta(
            html,
            "property",
            "og:image",
            "https://www.iunoni.com/logo2.png"
        );

        html = upsertCanonical(html, canonicalUrl);
        html = addPrerenderStyles(html);

        const prerenderedContent = renderDictionaryEntry(data, word);

        const rootPattern = /<div\s+id=["']root["']\s*><\/div>/i;

        if (!rootPattern.test(html)) {
            console.error("Could not find React root in dictionary HTML:", word);
            return makeResponse(originalHtml, originalResponse);
        }

        html = html.replace(
            rootPattern,
            `${prerenderedContent}<div id="root"></div>`
        );

        return makeResponse(html, originalResponse);

    } catch (error) {
        console.error("Dictionary prerender error:", error);
        return makeResponse(originalHtml, originalResponse);
    }
}
