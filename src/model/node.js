import { v4 as uuidv4 } from 'uuid';
export default class Node {
    constructor(data,parent){
        this.id=uuidv4();;
        this.data=data;
        this.children=[];
        this.parent= parent;
    }

    folderName(){
        return this.data
    }

     setChildren(node){
        this.children.push(node);
    }

    getChildren(){
        return this.children;
    }
}