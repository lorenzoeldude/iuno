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

function makeResponse(body, originalResponse) {
    const headers = new Headers(originalResponse.headers);

    headers.set("Content-Type", "text/html; charset=utf-8");

    headers.delete("Content-Length");
    headers.delete("Content-Encoding");
    headers.delete("ETag");

    return new Response(body, {
        status: originalResponse.status,
        statusText: originalResponse.statusText,
        headers,
    });
}

export async function onRequest(context) {
    const originalResponse = await context.next();
    const originalHtml = await originalResponse.text();

    try {
        const word = context.params.word;

        const apiResponse = await fetch(
            `${API_URL}/api/word/${encodeURIComponent(word)}`
        );

        if (!apiResponse.ok) {
            return makeResponse(originalHtml, originalResponse);
        }

        const data = await apiResponse.json();

        if (!data?.lemma?.lemma) {
            return makeResponse(originalHtml, originalResponse);
        }

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