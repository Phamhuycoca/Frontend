import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

const modules = [AllCommunityModule];

export const AgReact = () => {
  return (
    <AgGridProvider modules={modules}>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={[
            { id: 1, name: 'Nguyễn Văn A', age: 20 },
            { id: 2, name: 'Trần Văn B', age: 25 },
          ]}
          columnDefs={[{ field: 'id' }, { field: 'name' }, { field: 'age' }]}
        />
      </div>
    </AgGridProvider>
  );
};
