import { MDCDataTable } from "@material/data-table";
import {
  createEffect,
  createSignal,
  onCleanup,
  PropsWithChildren,
} from "solid-js";
import "./DataTable.scss";

interface TableProps {
  aria?: {
    label?: string;
  };
}

const Table = (props: PropsWithChildren<TableProps>) => {
  let dataTableElement: HTMLDivElement;
  const [dataTable, setDataTable] = createSignal<MDCDataTable>();

  createEffect(() => {
    setDataTable(new MDCDataTable(dataTableElement));
  });

  onCleanup(() => dataTable()?.destroy());

  return (
    <div class="mdc-data-table" ref={(el) => (dataTableElement = el)}>
      <div class="mdc-data-table__table-container">
        <table class="mdc-data-table__table" aria-label={props.aria?.label}>
          {props.children}
        </table>
      </div>
    </div>
  );
};

Table.Head = (props: PropsWithChildren) => {
  return <thead>{props.children}</thead>;
};

Table.Body = (props: PropsWithChildren) => {
  return <tbody class="mdc-data-table__content">{props.children}</tbody>;
};

Table.HeadRow = (props: PropsWithChildren) => {
  return <tr class="mdc-data-table__header-row">{props.children}</tr>;
};

Table.BodyRow = (props: PropsWithChildren) => {
  return <tr class="mdc-data-table__row">{props.children}</tr>;
};

Table.HeadCell = (props: PropsWithChildren<{ numeric?: boolean }>) => {
  return (
    <th
      classList={{
        "mdc-data-table__header-cell": true,
        "mdc-data-table__header-cell--numeric": !!props.numeric,
      }}
      role="columnheader"
      scope="col"
    >
      {props.children}
    </th>
  );
};

Table.BodyCell = (props: PropsWithChildren<{ numeric?: boolean }>) => {
  return (
    <td
      classList={{
        "mdc-data-table__cell": true,
        "mdc-data-table__cell--numeric": !!props.numeric,
      }}
    >
      {props.children}
    </td>
  );
};

export { Table };
