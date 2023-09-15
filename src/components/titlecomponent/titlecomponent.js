"use client";

function Tilecomponent({ data, selected = [], onClick }) {
  return data && data.length ? (
    <div className="flex flex-wrap items-center gap-1 mt-6">
      {data.map((dataitem) => (
        <label
          onClick={() => onClick(dataitem)}
          className={`cursor-pointer
           
          `}
          key={dataitem.id}
        >
          <span
            className={`rounded-lg border border-black px-6 py-2 font-bold ${
              selected &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataitem.id) !== -1
                ? "text-green-500 bg-black"
                : ""
            }`}
          >
            {dataitem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}

export default Tilecomponent;
