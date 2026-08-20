import { Spin } from "antd"
import { useEffect, useState } from "react";
import { loadingService, type LoadingState } from "../../utils/helpers/loadingService";
import type { Subscription } from "rxjs";
import './index.scss'

const LOADING_TEXT = "Đang tải dữ liệu...";

export const LoadingScreen = () => {
    const [state, setState] = useState<LoadingState>({
        loading: false
    });

    useEffect(() => {
        const subscription: Subscription =
            loadingService.state$.subscribe(
                newState => {
                    setState(newState);
                }
            );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (!state.loading) return null;

    return (
        <div className="loading-screen">
            <div className="loading-screen__card">
                <div className="loading-screen__spin">
                    <Spin size="large" />
                </div>
                <div className="loading-screen__text">
                    {LOADING_TEXT.split("").map((char, index) => (
                        <span
                            key={index}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}