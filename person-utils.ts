interface renderTreeNode {
    id: number;
    parentId: number;
    tag?: string;
    children?: renderTreeNode[];
    [key: string]: any;
}

function arrayToTree(items: renderTreeNode[]): renderTreeNode[] {
    // https://github.com/philipstanislaus/performant-array-to-tree
    const rootItems: renderTreeNode[] = [];
    const lookup: { [id: string]: any } = {};

    for (const item of items) {
      const itemId = item.id;
      const itemParentId = item.parentId;

      if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
        lookup[itemId] = { children: [] };
      }

      lookup[itemId] = {
        ...item,
        children: lookup[itemId].children,
      };

      const treeItem = lookup[itemId];

      if (itemParentId === -1) {
        // is a root item
        rootItems.push(treeItem);
      } else {
        if (!Object.prototype.hasOwnProperty.call(lookup, itemParentId)) {
          lookup[itemParentId] = { children: [] };
        }
        lookup[itemParentId].children!.push(treeItem);
      }
    }

    return rootItems;
  }
