import React from 'react';

export default ({lpData}) => {
  const {pool, pooledElephant, pooledAmount} = lpData;
  return <div className="lpTable">
    <table>
      <thead>
      <tr >
        <th colSpan="2">Elephant / {pool} on PCS</th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Pooled Elephant
          </td>
          <td>
            Pooled {pool}
          </td>
        </tr>
        <tr>
          <td>{Number(pooledElephant).toLocaleString()}</td>
          <td>{Number(pooledAmount).toLocaleString()}</td>
        </tr>
        <tr>
          <th colSpan="2" align="center">Constant Product Formula X*Y=K</th>
          
        </tr>
        <tr>
        <td colSpan="2" align="center">K = {Number(pooledElephant * pooledAmount).toLocaleString()}</td>
        </tr>
      </tbody>
      
    </table>
  </div>
}