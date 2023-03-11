import { useState } from 'react'
import { State } from '../lib/State'
import { apiPost } from '../lib/Fetcher'
import { useLocation } from 'wouter'

const LobbyPage = () => {
  const [location, setLocation] = useLocation()
  const [identity, setIdentity] = useState("")

  const connect = async (event) => {
    event.preventDefault()
    const payload = {
      identity: identity.length > 3 ? identity : "Guest",
      room: null
    }
    apiPost(`video_token`, payload)
    .then(({token}) => {
        State.update(s => {s.token = token})
        setLocation("/video_room")
      })
  }

  return (
    <div className="flex flex-col space-y-3">
      <h2>
        Lobby
      </h2>
        <p className="max-w-sm leading-normal">Videoconferencias al instante. Por favor, ingresa tu nombre y el nombre del cuarto de video.</p>
      <form onSubmit={connect} className="flex flex-col space-y-4">
        <div className="input-group">
          <label htmlFor="identity">Tu Nombre</label>
          <input 
            name="identity"
            type="text"
            className="border p-2 rounded max-w-md"
            onChange={e => setIdentity(e.target.value)}
            />
        </div>
        <div className="input-group">
          <label htmlFor="roomName">Nombre del Cuarto</label>
          <input 
            name="roomName"
            type="text"
            className="border p-2 rounded max-w-md"
            onChange={e => State.update(s => {s.roomName = e.target.value})}
            />
        </div>
        <button htmltype="submit" className="main-btn">
          Conectarse
        </button>
      </form>
    </div>
  )

}

export default LobbyPage
