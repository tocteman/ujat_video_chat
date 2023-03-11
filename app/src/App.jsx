import { Link, Route } from 'wouter'
import { useState } from 'react'
import LobbyPage from './pages/LobbyPage'
import VideoRoomPage from './pages/VideoRoomPage'

function App ()  {
  return (
    <main className="bg-neutral-900 text-neutral-50 min-h-screen overflow-x-hidden">
      <section className="p-8 flex flex-col justify-center max-w-xl mx-auto">
        <Route path="/" component={LobbyPage}/>
        <Route path="/video_room" component={VideoRoomPage}/>
      </section>
    </main>
  )
}

export default App
