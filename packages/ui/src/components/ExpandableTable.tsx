import React, { useState } from "react";
import type { ReactNode } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StraightRoundedIcon from "@mui/icons-material/StraightRounded";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import {
  collapseIconCellWidth,
  collapseIconSize,
  defaultMinTableWidth,
} from "../constants/table";
import { TableSortOrder } from "yield-up/src/shared/enums/tables.ts";
import { dotsTextOverflowStyles } from "../theme/styles.ts";
import { EmptyDataBody } from "./EmptyDataBody";
import { WithSx } from "../types";
import { convertSxToArray } from "../utils";

interface RowEntity<Sub = unknown> {
  id: string | number;
  breakdown?: Sub[];
}

export interface ColumnConfig<T = string> extends WithSx {
  key: keyof T | string;
  label: string;
  width?: number | string;
  format?: (data: T, isExpandableRow?: boolean) => ReactNode;
  isSortable?: boolean;
}

interface ExpandableTableProps<
  T extends RowEntity<Sub>,
  Sub extends { id: string | number } = T,
> extends WithSx {
  // Sets the minimum table width from which the horizontal scroll appears
  minWidth?: number;
  columns: ColumnConfig<T>[];
  data: T[]; // id for rows in data is required!
  renderExpandedRow?: (row: T, columns: ColumnConfig<T>[]) => ReactNode;
  isLoading?: boolean;
  renderSkeleton?: () => ReactNode;
  onSortClick?: (columnKey: ColumnConfig<T>["key"]) => void;
  sortState?: {
    key: ColumnConfig<T>["key"];
    direction: TableSortOrder;
  };
}

export const ExpandableTable = <
  T extends RowEntity<Sub>,
  Sub extends { id: string | number } = T,
>({
  renderExpandedRow,
  columns,
  data,
  isLoading = false,
  sx,
  minWidth = defaultMinTableWidth,
  sortState,
  onSortClick,
}: ExpandableTableProps<T, Sub>) => {
  const [openRowIds, setOpenRowIds] = useState<
    Record<string | number, boolean>
  >({});

  const toggleRow = (id: string | number) => {
    setOpenRowIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={[
          {
            p: 0,
            border: "1px solid",
            borderColor: "border.default",
            borderRadius: 2,
            bgcolor: "background.paper",
          },
          data.length === 0 && {
            overflow: "hidden",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          ...convertSxToArray(sx),
        ]}
      >
        <Table sx={{ tableLayout: "fixed", minWidth }}>
          <TableHead>
            <TableRow>
              <TableCell
                width={collapseIconCellWidth}
                sx={{
                  minWidth: collapseIconCellWidth,
                  maxWidth: collapseIconCellWidth,
                }}
              />
              {columns.map((column) => {
                const isSorted = sortState?.key === column.key;
                const direction = isSorted ? sortState?.direction : null;
                return (
                  <TableCell
                    key={column.key as string}
                    width={column.width}
                    sx={{
                      cursor: column?.isSortable ? "pointer" : "default",
                      userSelect: "none",
                      color: "text.secondary",
                      minWidth: column.width,
                      "&:hover .sort-icon": {
                        visibility: "visible",
                      },
                      ...column?.sx,
                    }}
                    onClick={() => {
                      if (column?.isSortable && onSortClick) {
                        onSortClick(column.key);
                      }
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.25}
                      width={1}
                      height={1}
                    >
                      <Typography variant="textSSB">{column.label}</Typography>
                      {column.isSortable && (
                        <StraightRoundedIcon
                          className="sort-icon"
                          sx={{
                            fontSize: 14,
                            transition: "transform 0.2s",
                            visibility: isSorted ? "visible" : "hidden",
                            transform:
                              direction === TableSortOrder.DESC
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
            {isLoading && (
              <TableRow
                sx={(theme) => ({
                  height: theme.spacing(0.5),
                  position: "relative",
                  zIndex: 4,
                })}
              >
                <TableCell padding="none" colSpan={columns.length + 1}>
                  <LinearProgress
                    sx={{
                      width: "100%",
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                    }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row) => {
                const isOpen = openRowIds[row.id];
                const expandable =
                  (Array.isArray(row.breakdown) && row.breakdown.length > 0) ||
                  renderExpandedRow;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow hover>
                      <TableCell
                        width={collapseIconCellWidth}
                        sx={[
                          isOpen && { backgroundColor: "background.default" },
                          {
                            minWidth: collapseIconCellWidth,
                            maxWidth: collapseIconCellWidth,
                          },
                        ]}
                      >
                        {expandable && (
                          <IconButton
                            size="small"
                            onClick={() => toggleRow(row.id)}
                          >
                            {isOpen ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        )}
                      </TableCell>
                      {columns.map(({ key, width, format }) => {
                        return (
                          <TableCell
                            key={key as string}
                            width={width}
                            sx={[
                              { minWidth: width, color: "text.secondary" },
                              isOpen && {
                                backgroundColor: "background.default",
                              },
                            ]}
                          >
                            {format ? (
                              format(row)
                            ) : (
                              <Typography
                                variant="textM"
                                title={row[key as keyof T] as string}
                                sx={dotsTextOverflowStyles}
                              >
                                {row[key as keyof T] as string}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    {expandable && (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length + 1}
                          sx={{ p: 0, border: "none", color: "text.secondary" }}
                        >
                          <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            {renderExpandedRow ? (
                              renderExpandedRow(row, columns)
                            ) : (
                              /* Default expanded row */
                              <Table sx={{ tableLayout: "fixed" }}>
                                <TableBody>
                                  {(row.breakdown as Sub[] | undefined)?.map(
                                    (subRow: Sub & RowEntity) => (
                                      <TableRow
                                        key={subRow.id}
                                        sx={[
                                          isOpen && {
                                            backgroundColor:
                                              "background.default",
                                          },
                                        ]}
                                      >
                                        <TableCell
                                          width={collapseIconCellWidth}
                                          sx={{
                                            minWidth: collapseIconCellWidth,
                                            maxWidth: collapseIconCellWidth,
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: collapseIconSize,
                                              height: collapseIconSize,
                                            }}
                                          />
                                        </TableCell>
                                        {columns.map(
                                          ({ key, width, format }) => {
                                            return (
                                              <TableCell
                                                key={key as string}
                                                sx={{
                                                  width: width,
                                                  minWidth: width,
                                                  color: "text.secondary",
                                                }}
                                              >
                                                {format ? (
                                                  format(subRow as any, true)
                                                ) : (
                                                  <Typography
                                                    variant="textM"
                                                    title={(subRow as any)[key]}
                                                    sx={dotsTextOverflowStyles}
                                                  >
                                                    {(subRow as any)[key]}
                                                  </Typography>
                                                )}
                                              </TableCell>
                                            );
                                          },
                                        )}
                                      </TableRow>
                                    ),
                                  )}
                                </TableBody>
                              </Table>
                            )}
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Box
          sx={{
            mt: "-1px",
            width: 1,
            border: "1px solid",
            borderColor: "border.default",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            overflow: "hidden",
          }}
        >
          <EmptyDataBody iconSize="small" sx={{ p: 2 }} />
        </Box>
      )}
    </>
  );
};
