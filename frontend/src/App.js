import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    axios.defaults.baseURL = "http://localhost:1198/api";

    const wait = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    const getBackendMessage = async () => {
        try {
            setIsLoading(true);
            const options = {
                url: "/a2rp",
                method: "GET",
            };
            wait(1000 * 3).then(async () => {
                const response = await axios(options);
                // console.log(response);
                const value = response.data;
                setData(value.message);
                setIsLoading(false);
            });
        } catch (error) {
            // console.log(error, "getbackendmessage error");
            setIsLoading(false);
            toast.error(error.message);
        } finally {
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <input
                    className={styles.serverButton}
                    type="button"
                    value={isLoading ? "loading..." : "click here to receive server message"}
                    disabled={isLoading}
                    onClick={getBackendMessage}
                />

                {data.length > 0 && isLoading === false
                    ? <h1 className={styles.serverMessage}>Message from server: <span>{data}</span></h1>
                    : <></>}

            </div>

            <ToastContainer />
        </div>
    )
}

export default App

