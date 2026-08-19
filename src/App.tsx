import { Button } from "antd";
import { confirmService } from "./utils/helpers/confirmService";
import { loadingService } from "./utils/helpers/loadingService";
export const App =()=>{
  return(
    <>
    <Button onClick={()=>{
      confirmService
    .open({
      title: 'Xóa sản phẩm',
      content: 'Bạn có chắc muốn xóa sản phẩm này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
    })
    .subscribe(confirmed => {
      if (confirmed) {
        console.log('Xóa:', confirmed);
      }
    });
    }}>Thêm</Button>
    <Button onClick={()=>{
      loadingService.startLoading();
    }}>Loading</Button>
    </>
  )
};