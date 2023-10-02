const Table = ({ data, columns }) => {
  return (
    <table className="w-full border border-collapse border-gray-300 table-auto max-w-scree min-w-[640px]">
      <thead>
        <tr>
          {columns.map(({ name, key }) => {
            return (
              <td key={key} className="p-4 font-medium text-left bg-gray-200 border-b">
                <th>{name}</th>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item?.id || index}>
            {columns.map(({ cell, key }, index) => (
              <td key={key || index} className="p-4">{cell?.(item) || item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
