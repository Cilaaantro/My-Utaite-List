import { useState } from "react"

export default function Login(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  return(
    <div>
      <input placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
      <br/>
      <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
    </div>
  )
}