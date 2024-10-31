type MenuItem = {
    title?: string;
    type?: string;
    shortcut?: string;
    onclick?: () => void;
};

type MenuObj = {
    options: {
        allowInsertColumn: boolean;
        allowDeleteColumn: boolean;
        allowRenameColumn: boolean;
        columnSorting: boolean;
        allowInsertRow: boolean;
        allowComments: boolean;
        allowDeleteRow: boolean;
        text: {
            insertANewColumnBefore: string;
            insertANewColumnAfter: string;
            deleteSelectedColumns: string;
            renameThisColumn: string;
            orderAscending: string;
            orderDescending: string;
            insertANewRowBefore: string;
            insertANewRowAfter: string;
            deleteSelectedRows: string;
            editComments: string;
            addComments: string;
            comments: string;
            clearComments: string;
        };
    };
    /**
     * Add a new column
     * @docs https://bossanova.uk/jexcel/v3/docs/programmatically-changes
     * @param numOfColumns [*] - num of columns to be added or data to be added in one single column
     * @param columnNumber [number]
     * @param insertBefore [boolean]
     */
    insertColumn: (numOfColumns: any, columnNumber: number, insertBefore: boolean) => void;
    deleteColumn: (columnNumber?: number, numOfColumns?: number) => void;
    /**
     * Change header by column
     */
    setHeader: (columnNumber: number, columnTitle?: string) => void;
    /**
     * Reorder a column asc or desc
     * @docs https://bossanova.uk/jexcel/v3/docs/programmatically-changes
     * @param columnNumber [number]
     * @param sortType [number] - One will order DESC, zero will order ASC, anything else will toggle the current order
     */
    orderBy: (columnNumber: number, sortType: number) => void;
    /**
     * Add a new row
     * @docs https://bossanova.uk/jexcel/v3/docs/programmatically-changes
     * @param mixed [*] number of blank lines to be insert or a single array with the data of the new row
     * @param rowNumber [number]
     * @param insertBefore [boolean]
     */
    insertRow: (numOfBlankLines: any, rowNumber: number, insertBefore?: boolean) => void;
    /**
     * Remove row by number
     */
    deleteRow: (rowNumber?: number, numOfRows?: number) => void;
    getSelectedColumns: () => [];
    getSelectedRows: () => [];
};

/**
 * Get list of menu items for columns operation
 * @param obj [MenuObj]
 * @param xPosNumber [number]
 */
const getColumnsFunctionality = (obj: MenuObj, xPosNumber: number): MenuItem[] => {
    const items: MenuItem[] = [];

    if (obj.options.allowInsertColumn) {
        items.push({
            title: obj.options.text.insertANewColumnBefore,
            onclick: function() {
                obj.insertColumn(1, xPosNumber, true);
            }
        });
    }

    if (obj.options.allowInsertColumn) {
        items.push({
            title: obj.options.text.insertANewColumnAfter,
            onclick: function() {
                obj.insertColumn(1, xPosNumber, false);
            }
        });
    }

    if (obj.options.allowDeleteColumn) {
        items.push({
            title: obj.options.text.deleteSelectedColumns,
            onclick: function() {
                obj.deleteColumn(obj.getSelectedColumns().length ? undefined : xPosNumber);
            }
        });
    }

    if (obj.options.allowRenameColumn) {
        items.push({
            title: obj.options.text.renameThisColumn,
            onclick: function() {
                obj.setHeader(xPosNumber);
            }
        });
    }

    return items;
};

/**
 * Define context menu for the table
 * @docs https://bossanova.uk/jexcel/v3/examples/contextmenu
 * @param obj [MenuObj]
 * @param xPos [null|string]
 * @param yPos [null|string]
 * @param e [MouseEvent]
 */
const contextMenu = (obj: MenuObj, xPos: null|string, yPos: null|string, e: MouseEvent): MenuItem[] => {
    const items: MenuItem[] = [];

    if (yPos == null && xPos !== null) {
        const xPosNumber = parseInt(xPos);

        // items.push(...getColumnsFunctionality(obj, xPosNumber));

        if (obj.options.columnSorting) {
            // items.push({ type: 'line' });

            items.push({
                title: obj.options.text.orderAscending,
                onclick: function() {
                    obj.orderBy(xPosNumber, 0);
                }
            });
            items.push({
                title: obj.options.text.orderDescending,
                onclick: function() {
                    obj.orderBy(xPosNumber, 1);
                }
            });
        }
    } else if (yPos !== null) {
        const yPosNumber = parseInt(yPos, 10);

        if (obj.options.allowInsertRow) {
            items.push({
                title: obj.options.text.insertANewRowBefore,
                onclick: function() {
                    obj.insertRow(1, yPosNumber, true);
                }
            });

            items.push({
                title: obj.options.text.insertANewRowAfter,
                onclick: function() {
                    obj.insertRow(1, yPosNumber);
                }
            });
        }

        if (obj.options.allowDeleteRow) {
            items.push({
                title: obj.options.text.deleteSelectedRows,
                onclick: function() {
                    obj.deleteRow(obj.getSelectedRows().length ? undefined : yPosNumber);
                }
            });
        }
    }

    return items;
};

export default contextMenu;
