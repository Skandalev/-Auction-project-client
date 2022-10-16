import React from 'react'
import './Rules.css'
import { useState,useEffect } from 'react'
const Rules = () => {
 
  return (
    <div>
        
      <h1>Rules and Terms</h1>
      <strong>Rules of the bids</strong>
      <p> <li>For making bids or adding auctions you must log in or register.</li>
      <li>The first bid must be bigger or equal to the starter price.</li>
      <li> If the last bid is under 100$ the next bid must be bigger 5$ at least.</li>
      <li>  If the last bid is under 1000$ the next bid must be bigger 50$ at least.</li>
      <li> If the last bid is more than 1000$ next bid must be bigger 150$ at least.  </li></p>
<div>
  

</div>
<table style={{display:'flex',
    justifyContent: 'space-around'}}>
    <tbody>
        <tr>
          <th>more 1000$</th>
          <th>less 1000$</th>
          <th>less 100$</th>
          <th> last bid</th>
        </tr>
        <tr>
          <td>150$</td>
          <td>50$</td>
          <td>5$</td>
          <td>min bid</td>
        </tr>
    
        </tbody>
      </table>
      <h1>Your auction Items</h1>
         <li>you can delete your action lots by clicking on the X button</li>
         <li>if you delete lots three hours before the the auction ends you must pay abandon fee </li>
    </div>
  )
}

export default Rules