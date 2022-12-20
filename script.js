class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.root = this.buildTree(array, 0, array.length-1)
    }

    buildTree(array, start, end) {
        if (start > end) return null
        let mid = parseInt((start+end)/2)
        let node = new Node(array[mid])
        node.left = this.buildTree(array, start, mid-1)
        node.right = this.buildTree(array, mid+1, end)
        return node
    }

    insert(value, tmp, node = this.root) {
        if (node === null) {
            if (value < tmp.data) {
                tmp.left = new Node(value)
            } 
            else {
                tmp.right = new Node(value)
            }
            return;
            } else {
            if (value < node.data) {
                tmp = node
                let currentNode = node.left
                this.insert(value, tmp, currentNode)
            }
            else {
                tmp = node
                let currentNode = node.right
                this.insert(value, tmp, currentNode)
             }
            }
        }
    // insert(value, currentNode = this.root) {
    //     if (currentNode === null) return new Node(value);
    //     // traverse
    //     if (value > currentNode.data) {
    //         currentNode.right = this.insert(value, currentNode.right)
    //     } else {
    //         currentNode.left = this.insert(value, currentNode.left)
    //     }
    //     return currentNode
    // }

    delete(value, currentNode = this.root) {
        // no node then return null
        if (currentNode === null) return null;
        // locate value by traversing
        if (value > currentNode.data) {
            currentNode.right = this.delete(value, currentNode.right)
        } 
        else if (value < currentNode.data) {
            currentNode.left = this.delete(value, currentNode.left)
        } 
        // when value matches
        else { 
            // one child and no child | replace connection to currentnode with child of currentnode
            if (currentNode.left === null) {
                return currentNode.right
            } else if (currentNode.right === null) {
                return currentNode.left
            } else { // two child
                // find smallest value on right subtree
                // remove that value (same steps as above)( save  it in temp!)
                // replace the value oringally removed
                let rightSubtree = currentNode.right
                let data = rightSubtree.data
                while (rightSubtree.left !== null) {
                    data = rightSubtree.left.data
                    rightSubtree = rightSubtree.left
                }
                currentNode.data = data
                currentNode.right = this.delete(data, currentNode.right)
            } 
        }
        return currentNode;
    }

    find(value, currentNode = this.root) {
        if (value === currentNode.data) return currentNode

        if (value > currentNode.data) currentNode = this.find(value, currentNode.right)
        if (value < currentNode.data) currentNode = this.find(value, currentNode.left)

        return currentNode 
    }

    levelOrder(currentNode = this.root) {
        if (currentNode === null) return;
        let queue = []
        let values = []
        queue.push(currentNode)
        while (queue.length !== 0) {
            let firstNode = queue.shift()
            values.push(firstNode.data)
            if(firstNode.left !== null) queue.push(firstNode.left)
            if(firstNode.right !== null) queue.push(firstNode.right)
        }
        console.log(values)
    }
    // levelOrderRecursive() {
    //     for(let i=0;i<)
    // }

    inorder(callback, currentNode = this.root, inorderValues = []) {
        if (currentNode === null) return null;
        this.inorder(callback, currentNode.left, inorderValues)
        if (callback) {
            callback(currentNode.data)
        } else inorderValues.push(currentNode.data)
        this.inorder(callback, currentNode.right, inorderValues)

        return inorderValues
    }

    preorder(callback, currentNode = this.root, preorderValues = []) {
        if (currentNode === null) return null;
        if (callback) {
            callback(currentNode.data)
        } else preorderValues.push(currentNode.data)
        this.preorder(callback, currentNode.left, preorderValues)
        this.preorder(callback, currentNode.right, preorderValues)

        return preorderValues
    }



    postorder(callback, currentNode = this.root, postorderValues = []) {
        if (currentNode === null) return null;
        this.postorder(callback, currentNode.left, postorderValues)
        this.postorder(callback, currentNode.right, postorderValues)
        if (callback) {
            callback(currentNode.data)
        } else postorderValues.push(currentNode.data)
        return postorderValues
    }

    height(currentNode = this.root) {
        if (currentNode === null) return -1;
        let leftHeight = this.height(currentNode.left)
        let rightHeight = this.height(currentNode.right)

        return Math.max(leftHeight, rightHeight) + 1
    }

    findNodeHeight(value, currentNode = this.root) {
        if (value === currentNode.data) return this.height(currentNode)

        if (value > currentNode.data) currentNode = this.findNodeHeight(value, currentNode.right)
        if (value < currentNode.data) currentNode = this.findNodeHeight(value, currentNode.left)

        return currentNode 
    }
    
    depth(node) {
        let maxHeight = this.height(this.root)
        return maxHeight - this.findNodeHeight(node)
    }

    depth2(value, currentNode = this.root) {
        if (currentNode === null) return 0
        if (currentNode.data === value) return 0
        if (value < currentNode.data) return 1 + this.depth2(value, currentNode.left)
        else {return 1 + this.depth2(value, currentNode.right)}

    }

    isBalanced(currentNode = this.root) {
        if (currentNode.left === null || currentNode.right === null) return
        
        if (Math.abs(this.findNodeHeight(currentNode.left.data)-this.findNodeHeight(currentNode.right.data))>1) {
            return false 
        }
        if (currentNode.left !== null) {
            this.isBalanced(currentNode.left)
        }
        if (currentNode.right !== null) {
            this.isBalanced(currentNode.right)
        }
        return true;
    }

    rebalance() {
        let sorted = this.inorder();
        this.root = this.buildTree(sorted,0,sorted.length-1)
    }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
// driver
let tree = new Tree([1,52,56,100,121,202])
prettyPrint(tree.root)

console.log(`Tree balanced?: ${tree.isBalanced()}`)

console.log(`Preorder: [${tree.preorder()}]`)
console.log(`Inorder: [${tree.inorder()}]`)
console.log(`Postorder: [${tree.postorder()}]`)

console.log('Adding numbers...')
tree.insert(400)
tree.insert(450)
tree.insert(500)
tree.insert(501)
prettyPrint(tree.root)

console.log(`Tree balanced?: ${tree.isBalanced()}`)

console.log('Rebalancing...')
tree.rebalance()
prettyPrint(tree.root)
console.log(`Tree balanced?: ${tree.isBalanced()}`)
console.log(`Preorder: [${tree.preorder()}]`)
console.log(`Inorder: [${tree.inorder()}]`)
console.log(`Postorder: [${tree.postorder()}]`)