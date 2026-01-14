import { memo, useCallback, useMemo, useState } from "react";

const data = [
  {
    id: 1,
    title: "title A",
    summary:
      "A A A AAAAAA AAAAA AAAAA AAAAAAAA  AAAAA AAAAAAAA AAAAA AAAAAAAA AAAAA AAAAAAAA AAAAA AAAAAAAA AAAAAA AAAAA",
  },
  {
    id: 2,
    title: "title B",
    summary:
      "B B B BBBBBB BBBB BBBBBB BBB BBBBB BBBB BBBBBB BBBBBBBB BBBB BBBBBB BBBBBBBB BBBB BBBBBB BBB BBBBB BBBB BBBBBB BBBBBBBB BBBB BBBBBB BBBBBBBB BBBBBB BBBBB",
  },
  {
    id: 3,
    title: "title C",
    summary:
      "C C C CCCCCC CCCCC CCCCC CCCCCCCC CCCC  CCCCCCCC CCCC CCCCCCCC CCCC CCCCCCCC CCCC CCCCCCCC CCCC CCCCCCCC CCCCCC CCCCC",
  },
];

const AccordianItem = memo(({ item, handleUpdateActiveItems, selectedIds }) => {
  console.log("selectedIds:", selectedIds);

  const isOpenState = useMemo(
    () => selectedIds.includes(item.id),
    [item.id, selectedIds]
  );
  console.log("item:id: open", item?.id, isOpenState);

  return (
    <div style={{ background: "#8c1c61", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{item?.title}</div>
        <div
          onClick={() => handleUpdateActiveItems(item?.id)}
          style={{
            transform: isOpenState ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease",
          }}
        >
          V
        </div>
      </div>
      <div
        style={{
          //   display: isOpenState ? "block" : "none",
          maxHeight: isOpenState ? "75px" : "0px",
          overflowY: "scroll",
          visibility: isOpenState ? "visible" : "hidden",
          transition: "all 0.5s ease",
        }}
      >
        {item?.summary}
      </div>
    </div>
  );
});

AccordianItem.displayName = "AccordianItem";

function Accordian() {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleUpdateActiveItems = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((el) => el !== id)
        : [...new Set([...prev, id])]
    );
  }, []);

  return (
    <div
      style={{
        width: "500px",
        border: "1px solid black",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
      }}
    >
      {data?.map((item, index) => (
        <AccordianItem
          item={item}
          key={index + item?.title}
          handleUpdateActiveItems={handleUpdateActiveItems}
          selectedIds={selectedIds}
        />
      ))}
    </div>
  );
}

export default Accordian;
