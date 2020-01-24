import React from 'react';
import {Dynamo} from './DynamoDB/Dynamo'
import {Mysql} from './MySql/MySql'

function App() {
  return (
    <div className="App">
      <Dynamo/>
      <Mysql />
    </div>
  );
}

export default App;
