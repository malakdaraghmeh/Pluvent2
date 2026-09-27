/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DynamicTable({ data = [], columns = [] }) {
    return (
        <div className="card shadow-lg bg-white p-4 rounded-2xl border border-gray-200">
            <DataTable value={data} className="rounded-2xl">
                {columns.map((col, index) => (
                    <Column
                        key={col.field || col.key || index}
                        field={col.field}
                        header={col.header}
                        body={col.body}
                        style={{ minWidth: col.width || '150px' }}
                        headerClassName="text-center"
                        bodyClassName="text-center"
                    />
                ))}
            </DataTable>
        </div>
    );
}
