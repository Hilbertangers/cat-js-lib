// 二叉树中序遍历 迭代
// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
var inorderTraversal = function(root) {
  let stack = []
  let result = []
  let currNode = root
  while(currNode || stack.length) {
    while(currNode) {
      stack.push(currNode)
      currNode = currNode.left
    }
    currNode = stack.pop()
    result.push(currNode.val)
    currNode = currNode.right
  }
  return result
};

// 二叉树前序遍历 迭代
// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
var preorderTraversal = function(root) {
  let stack = []
  let result = []
  let currNode = root
  while(currNode || stack.length) {
    while(currNode) {
      result.push(currNode.val)
      stack.push(currNode)
      currNode = currNode.left
    }
    currNode = stack.pop()
    currNode = currNode.right
  }
  return result
};

// 二叉树后序遍历 迭代
// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/submissions/
var postorderTraversal = function(root) {
  let stack = []
  let result = []
  let currNode = root
  let last = null
  while(currNode || stack.length) {
    while(currNode) {
      stack.push(currNode)
      currNode = currNode.left
    }
    currNode = stack[stack.length - 1]
    if (!currNode.right || currNode.right === last) {
      currNode = stack.pop()
      result.push(currNode.val)
      last = currNode
      currNode = null
    } else {
      currNode = currNode.right
    }
  }
  // 也可以写从right开始的前序遍历，然后反转数组
};

// N叉树前序遍历 迭代
// https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/
var preorder = function(root) {
  if (!root) return []
  const stack = [root]
  const result = []
  while(stack.length) {
    let currNode = stack.pop()
    result.push(currNode.val)
    for (let i = currNode.children.length - 1; i >= 0; i--) {
      stack.push(currNode.children[i])
    }
  }
  return result
};

// N叉树后序遍历 迭代
// https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/
var postorder = function(root) {
  if (!root) return []
  const stack = [root]
  const result = []
  while(stack.length) {
    let currNode = stack.pop()
    result.push(currNode.val)
    for (let i = 0; i < currNode.children.length; i++) {
      stack.push(currNode.children[i])
    }
  }
  return result.reverse()
};


// 左叶子之和
// https://leetcode-cn.com/problems/sum-of-left-leaves/
var sumOfLeftLeaves = function(root) {
  let result = 0
  const traversal = root => {
    if(root == null) return
    if (root.left && !root.left.left && !root.left.right) {
      result += root.left.val
    }
    traversal(root.left)
    traversal(root.right)
  }
  traversal(root)
  return result
};

// 路径总和
// https://leetcode-cn.com/problems/path-sum-iii/
var pathSum = function(root, sum) {
  const countPath = (root, sum) => {
    if (root == null) return 0
    sum -= root.val
    return (sum === 0 ? 1 : 0) + countPath(root.left, sum) + countPath(root.right, sum)
  }
  if (root === null) return 0
  return countPath(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
};
