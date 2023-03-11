import { useState, useEffect } from 'react'
import { State } from '../lib/State'
import { useLocation } from 'wouter'
import Video from 'twilio-video'
import Transmission from '../components/Transmission'

const VideoRoomPage = () => {
  const [ room, setRoom ] = useState(null)

  const token = State.useState(s => s.token)
  const roomName = State.useState(s => s.roomName)
  const [location, setLocation] = useLocation()
  const [ transmissions, setTransmissions ] = useState([])

  const transmissionConnection = transmission => {
    setTransmissions(prevtransmissions => [...prevtransmissions, transmission]);
  };

  const transmissionDisconnection = transmission => {
    setTransmissions(prevtransmissions => prevtransmissions.filter(p => p !== transmission))
  }

  useEffect(() => {
    if (!token?.length > 0) { return setLocation("/") }
    Video.connect(token, { name: roomName })
      .then(room => { setRoom(room) })
  }, [token])


  useEffect(() => {
    if (!room) return
   
    room.on("participantConnected", p => transmissionConnection(p));
    room.on("participantDisconnection", p => transmissionDisconnection(p));
    room.participants.forEach(p => transmissionConnection(p));

  }, [room])

  return (
    <>
    <h2 className="text-neutral-300">Cuarto <span className="text-neutral-50">{roomName}</span></h2>
    <div className="flex space-x-8">
      <div>
        {room ? (
          <Transmission
          key={room.localParticipant?.sid}
          transmission={room.localParticipant}
          type="local"
          />
        ) : ( "")
      }
      </div>
      <div className="flex flex-col space-y-4">
      {transmissions.map(transmission => (
        <Transmission key={transmission.sid} transmission={transmission} type="remote"/>
      ))}
      </div>
    </div>
    </>


  )


}

export default VideoRoomPage
