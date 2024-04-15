// 回文数
// https://leetcode-cn.com/problems/palindrome-number/
/**
 * @param {number} x Int
 * @return {boolean}
 */
var isPalindrome = function(x) {
  // 纯number操作
  if (x < 0) return false;
  let reverse = 0;
  let arg = x;
  while(arg >= 1) {
    reverse = reverse * 10 + Math.floor(arg % 10);
    arg = arg / 10;
  }
  return reverse === x;
};


//
// https://leetcode-cn.com/problems/merge-two-sorted-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list2, list1.next)
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2;
  }
};

// 旋转链表
// https://leetcode-cn.com/problems/rotate-list/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  if (!head || !head.next) return head;
  if (k === 0) return head;
  let nextNode = head;
  // 减少loop次数
  let length = 1;
  while(nextNode.next) {
    length++;
    nextNode = nextNode.next
  }
  const _k = k % length;
  if (_k === 0) return head;
  const divideIndex = length - _k;
  // 寻找新头
  nextNode = head;
  for (let index = 1; index < divideIndex; index++) {
    nextNode = nextNode.next;
  }
  const newHead = nextNode.next;
  nextNode.next = null;

  // 粘贴旧头
  nextNode = newHead;
  while(nextNode.next) {
    nextNode = nextNode.next
  }
  nextNode.next = head;

  return newHead
};

// const head = {
//   value: 1,
//   next: {
//     value: 2,
//     next: null
//   }
// }

// console.log(rotateRight(head, 2));


// 二叉搜索树中第K小的元素
// https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// 思路：二叉搜索树的中序遍历会返回从小到大的递增数组
var kthSmallest = function(root, k) {
  const stack = [];
  let curNode = root;
  const result = [];
  while(curNode || stack.length) {
    if (result.length >= k) {
      break;
    }
    while(curNode) {
      stack.push(curNode)
      curNode = curNode.left;
    }
    curNode = stack.pop();
    result.push(curNode.val);
    curNode = curNode.right;
  }
  return result[result.length - 1];
};

// 11. 盛最多水的容器
// https://leetcode-cn.com/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针
var maxArea = function(height) {
  let result = 0;
  let a = 0;
  let b = height.length - 1;
  for (;a < b;) {
    let area = (b - a) * (height[a] > height[b] ? height[b] : height[a]);
    if (area > result) {
      result = area
    }
    if (height[a] < height[b]) {
      a++;
    } else {
      b--;
    }
  }
  return result;
};

// 爬楼梯
// https://leetcode.cn/problems/climbing-stairs/comments/
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  // if (n === 0) { return 0 }
  if (n === 1) { return 1 }
  if (n === 2) { return 2 }
  let dp = [0, 1, 2]
  for (let i = 3;i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};

// 螺旋矩阵 II
// https://leetcode-cn.com/problems/spiral-matrix-ii/
/**
 * @param {number} n
 * @return {number[][]}
 */
// 嫌麻烦就没手写 设定边界
 var generateMatrix = function(n) {
  const maxNum = n * n;
  let curNum = 1;
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let row = 0, column = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 右下左上
  let directionIndex = 0;
  while (curNum <= maxNum) {
      matrix[row][column] = curNum;
      curNum++;
      const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
      if (nextRow < 0 || nextRow >= n || nextColumn < 0 || nextColumn >= n || matrix[nextRow][nextColumn] !== 0) {
          directionIndex = (directionIndex + 1) % 4; // 顺时针旋转至下一个方向
      }
      row = row + directions[directionIndex][0];
      column = column + directions[directionIndex][1];
  }
  return matrix;
};


/**
 * 14. 最长公共前缀
 * https://leetcode.cn/problems/longest-common-prefix/
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
  if (!strs.length) return '';
  // 优化点：可以先找出最短的，作为比对的字符串
  let first = strs[0]
  let rest = strs.slice(1)
  let result = ''
  for (let index = 0; index < first.length; index++) {
    const element = first[index];

    let isTrue = true
    for (let j = 0; j < rest.length; j++) {
      const str = rest[j];
      if (str[index] !== element) {
        isTrue = false
        break
      }
    }

    if (isTrue) {
      result += element
    } else {
      break
    }
  }
  return result
};
