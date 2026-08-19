import { Spin } from "antd"
import { useEffect, useState } from "react";
import { loadingService, type LoadingState } from "../../utils/helpers/loadingService";
import type { Subscription } from "rxjs";
// import './index.scss'
export const LoadingScreen = ()=>{
    const [state, setState] = useState<LoadingState>({
        loading:false
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
    return (
        <>
        <Spin spinning={state.loading} fullscreen description='Đang tải dữ liệu...' className="loading-screen"/>
        </>
    )
}