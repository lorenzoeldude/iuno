import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../../../config";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("invalid");
            return;
        }

        async function verifyEmail() {
            try {
                const response = await fetch(
                    `${API_URL}/verify-email?token=${token}`
                );

                if (!response.ok) {
                    setStatus("invalid");
                    return;
                }

                setStatus("success");
            } catch {
                setStatus("error");
            }
        }

        verifyEmail();
    }, [searchParams]);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    maxWidth: "500px",
                    textAlign: "center",
                }}
            >
                {status === "loading" && (
                    <>
                        <h1>Verifying your email...</h1>
                        <p>Please wait a moment.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1>✅ Email verified!</h1>
                        <p>Your account has been successfully verified.</p>

                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                marginTop: "1.5rem",
                                padding: "0.75rem 1.5rem",
                                cursor: "pointer",
                            }}
                        >
                            Go to Login
                        </button>
                    </>
                )}

                {status === "invalid" && (
                    <>
                        <h1>Invalid verification link</h1>
                        <p>
                            This verification link is invalid or has expired.
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                marginTop: "1.5rem",
                                padding: "0.75rem 1.5rem",
                                cursor: "pointer",
                            }}
                        >
                            Back to Login
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h1>Something went wrong</h1>
                        <p>
                            We couldn't verify your email. Please try again
                            later.
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                marginTop: "1.5rem",
                                padding: "0.75rem 1.5rem",
                                cursor: "pointer",
                            }}
                        >
                            Back to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}