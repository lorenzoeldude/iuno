export async function onRequest() {
    const response = await fetch(
        "https://iunoni-api.onrender.com/sitemap.xml"
    );

    if (!response.ok) {
        return new Response(
            "Failed to fetch sitemap",
            {
                status: 502,
                headers: {
                    "Content-Type": "text/plain",
                },
            }
        );
    }

    const sitemap = await response.text();

    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
}