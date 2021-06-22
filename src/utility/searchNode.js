export default function searchNode(id,node){
    let obj;
    if(id===node.id){
        return node;
    }
    else if (node.children.length>0){ 
        for(let i=0; i<node.children.length;i++){
            obj= searchNode(id,node.children[i]);
            if(obj && obj.id) return obj    
        }   
} 
} 