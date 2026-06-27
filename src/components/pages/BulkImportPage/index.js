import { useState } from "react";

export default function BulkImportPage() {
    const [jsonText, setJsonText] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [count, setCount] = useState(0);

    const validate = () => {
        setValidated(false);
        setCount(0);
        setMessage("");

        try {
            const data = JSON.parse(jsonText);

            if (!Array.isArray(data)) {
                setMessage("JSON root must be an array.");
                return;
            }

            for (let i = 0; i < data.length; i++) {
                const item = data[i];

                if (!item.lemma) {
                    setMessage(`Entry ${i + 1}: missing lemma object.`);
                    return;
                }

                if (!item.lemma.lemma) {
                    setMessage(`Entry ${i + 1}: missing lemma.`);
                    return;
                }

                if (!item.lemma.part_of_speech) {
                    setMessage(
                        `Entry ${i + 1}: missing part_of_speech.`
                    );
                    return;
                }

                if (!Array.isArray(item.definitions)) {
                    setMessage(
                        `Entry ${i + 1}: definitions must be an array.`
                    );
                    return;
                }

                if (!Array.isArray(item.meanings)) {
                    setMessage(
                        `Entry ${i + 1}: meanings must be an array.`
                    );
                    return;
                }

                if (!Array.isArray(item.examples)) {
                    setMessage(
                        `Entry ${i + 1}: examples must be an array.`
                    );
                    return;
                }

                if (!Array.isArray(item.derivatives)) {
                    setMessage(
                        `Entry ${i + 1}: derivatives must be an array.`
                    );
                    return;
                }

                if (!Array.isArray(item.manual_forms)) {
                    setMessage(
                        `Entry ${i + 1}: manual_forms must be an array.`
                    );
                    return;
                }
            }

            setValidated(true);
            setCount(data.length);
            setMessage(`✅ JSON is valid. ${data.length} entries found.`);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const importJson = async () => {
        if (!validated) {
            setMessage("Please validate first.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "http://localhost:8080/api/admin/bulk-import",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: jsonText,
                }
            );

            const body = await res.text();

            if (!res.ok) {
                throw new Error(body);
            }

            setMessage(body);

        } catch (err) {
            setMessage(err.message);
        }

        setLoading(false);
    };

    const loadFile = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const text = await file.text();

        setJsonText(text);
        setValidated(false);
        setCount(0);
        setMessage("");
    };

    return (
        <div
            style={{
                maxWidth: 1100,
                margin: "40px auto",
                padding: 20,
            }}
        >
            <h1>Bulk Import</h1>

            <p>
                Paste a JSON array of WriteRequest objects or upload a JSON file.
            </p>

            <input
                type="file"
                accept=".json"
                onChange={loadFile}
            />

            <br />
            <br />

            <textarea
                value={jsonText}
                onChange={(e) => {
                    setJsonText(e.target.value);
                    setValidated(false);
                }}
                rows={32}
                style={{
                    width: "100%",
                    fontFamily: "monospace",
                    fontSize: 13,
                }}
            />

            <br />
            <br />

            <button
                onClick={validate}
                disabled={loading}
            >
                Validate
            </button>

            <button
                onClick={importJson}
                disabled={loading || !validated}
                style={{ marginLeft: 12 }}
            >
                {loading ? "Importing..." : "Import"}
            </button>

            <div style={{ marginTop: 20 }}>
                <strong>Status:</strong>
                <br />
                {message}
            </div>

            {validated && (
                <div style={{ marginTop: 10 }}>
                    Entries ready to import: <strong>{count}</strong>
                </div>
            )}
        </div>
    );
}