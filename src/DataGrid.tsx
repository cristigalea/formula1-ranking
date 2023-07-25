export default function DataGrid({
  columns,
  data,
}: {
  columns: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}) {
  if (!columns.length) {
    return <div>Invalid configuration</div>;
  }
  const first_column = columns[0];
  const last_column = columns.length ? columns[columns.length - 1] : columns[0];
  const middle_columns = columns.filter(
    (item) => item !== first_column && item !== last_column
  );
  return (
    <table className="table-auto w-full text-left border">
      <thead className="">
        <tr className="bg-slate-100">
          <th className="py-4 px-2 border-t rounded-tl-lg">{first_column}</th>
          {middle_columns.map((column, index) => (
            <th key={`head-cell-${index}`}>
              {column.startsWith("image:") ? column.split(":")[1] : column}
            </th>
          ))}
          <th className="border-t rounded-tr-lg">{last_column}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dataItem, dataIndex) => (
          <tr key={`row-${dataIndex}`} className="bg-slate-100 border-t-2">
            {Object.keys(dataItem).map((key, keyIndex) => (
              <td
                key={`row-${dataIndex}-cell-${keyIndex}`}
                className={`py-4 px-2 ${
                  dataIndex === data.length - 1 && keyIndex === 0
                    ? "rounded-bl-lg"
                    : ""
                } ${
                  dataIndex === data.length - 1 &&
                  keyIndex === Object.keys(dataItem).length - 1
                    ? "rounded-br-lg"
                    : ""
                }`}
              >
                {columns[keyIndex].startsWith("image:") ? (
                  <img
                    className="w-10"
                    src={dataItem[key]}
                    alt={columns[keyIndex].split(":")[1]}
                  />
                ) : (
                  dataItem[key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
