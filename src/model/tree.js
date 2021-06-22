export default class Tree{
    constructor(node){
        this.node=node;
        this._root=this.node
    }

    getTree(){
        return this._root;
    }
}