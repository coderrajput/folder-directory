import './App.css';
import Tree from './model/tree';
import Node from './model/node';
import Directory from './component/Directory.js'
import {useDispatch, useSelector} from 'react-redux'
import {addRootNode} from './store/slice/nodeSlice';
import ErrorBoundary from './component/ErrorBoundary';

function App() {
  let dispatch= useDispatch();
  let rootNode= new Node('root',null);
  const tree= new Tree(rootNode);
  dispatch(addRootNode(rootNode));
  return (
  <ErrorBoundary>
        <div className="App">
            <Directory />    
        </div>
  </ErrorBoundary>    
  );
}

export default App;