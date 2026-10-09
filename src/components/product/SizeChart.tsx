import { sizeChart } from "@/data/info";

export function SizeChart() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[22rem] text-left text-sm">
          <caption className="sr-only">Garment measurements in inches</caption>
          <thead>
            <tr className="border-b border-ink/20 text-ash">
              {sizeChart.columns.map((c) => (
                <th key={c} scope="col" className="py-3 pr-4 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {sizeChart.rows.map(([size, ...cells]) => (
              <tr key={size} className="border-b border-ink/10">
                <th scope="row" className="py-3 pr-4 font-normal">
                  {size}
                </th>
                {cells.map((c, i) => (
                  <td key={i} className="py-3 pr-4">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-ash">
        Measurements in inches. {sizeChart.note}
      </p>
    </div>
  );
}
