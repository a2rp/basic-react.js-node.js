import { useState } from "react";
import styles from "./styles.module.css";

const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:1198/api"
).replace(/\/+$/, "");

const App = () => {
    const [requestState, setRequestState] = useState("idle");
    const [serverResponse, setServerResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const getBackendMessage = async () => {
        setRequestState("loading");
        setServerResponse(null);
        setErrorMessage("");

        try {
            // The Vite frontend calls the Express endpoint configured for this environment.
            const response = await fetch(`${API_BASE_URL}/a2rp`, {
                headers: { Accept: "application/json" },
            });
            let payload;
            try {
                payload = await response.json();
            } catch {
                throw new Error("The server returned an invalid JSON response.");
            }

            if (!response.ok) {
                throw new Error(payload.message || `Request failed with status ${response.status}`);
            }

            setServerResponse(payload);
            setRequestState("success");
        } catch (error) {
            // Network failures and API errors are shown without exposing internal details.
            setErrorMessage(error instanceof Error ? error.message : "Unable to reach the backend");
            setRequestState("error");
        }
    };

    const isLoading = requestState === "loading";

    return (
        <main className={styles.page}>
            <section className={styles.card} aria-labelledby="page-title">
                <div className={styles.badge}>Vite frontend + Express backend</div>
                <p className={styles.eyebrow}>Full-stack starter</p>
                <h1 id="page-title">Request a message from the server.</h1>
                <p className={styles.intro}>
                    This small React interface calls the Node.js API and displays its JSON response.
                </p>

                <button
                    className={styles.button}
                    type="button"
                    onClick={getBackendMessage}
                    disabled={isLoading}
                >
                    {isLoading ? "Requesting..." : "Get server message"}
                </button>

                <div className={styles.result} aria-live="polite">
                    {requestState === "idle" && (
                        <p className={styles.muted}>Start the backend, then click the button to make a request.</p>
                    )}

                    {requestState === "loading" && (
                        <p className={styles.muted}>Waiting for the Express API response...</p>
                    )}

                    {requestState === "success" && serverResponse && (
                        <div>
                            <p className={styles.resultLabel}>Response from {serverResponse.apiUrl}</p>
                            <p className={styles.message}>{serverResponse.message}</p>
                        </div>
                    )}

                    {requestState === "error" && (
                        <div>
                            <p className={styles.resultLabel}>Request failed</p>
                            <p className={styles.error}>{errorMessage}</p>
                        </div>
                    )}
                </div>

                <p className={styles.endpoint}>API base URL: {API_BASE_URL}</p>
            </section>
        </main>
    );
};

export default App;
