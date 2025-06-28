// src/components/ui/Table.tsx

import React, { ReactNode, HTMLAttributes } from "react";

// Table component wrapper
export const Table: React.FC<
  React.HTMLAttributes<HTMLTableElement> & { children: ReactNode }
> = ({ children, className, ...props }) => {
  return (
    <table
      className={`min-w-full divide-y divide-gray-700 ${className ?? ""}`}
      {...props}
    >
      {children}
    </table>
  );
};

// Table header wrapper
export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement> & { children: ReactNode }
> = ({ children, className, ...props }) => {
  return (
    <thead className={className ?? ""} {...props}>
      {children}
    </thead>
  );
};

// Table body wrapper
export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement> & { children: ReactNode }
> = ({ children, className, ...props }) => {
  return (
    <tbody className={className ?? ""} {...props}>
      {children}
    </tbody>
  );
};

// Table row wrapper
export const TableRow: React.FC<
  React.HTMLAttributes<HTMLTableRowElement> & { children: ReactNode }
> = ({ children, className, ...props }) => {
  return (
    <tr className={className ?? ""} {...props}>
      {children}
    </tr>
  );
};

// Table head cell (th)
export const TableHead: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }
> = ({ children, className, ...props }) => {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-yellow-300 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </th>
  );
};

// Table data cell (td)
export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }
> = ({ children, className, ...props }) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-300 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </td>
  );
};
