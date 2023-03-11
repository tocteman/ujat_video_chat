import { useState, useEffect, useRef } from 'react'

const Transmission = ({transmission, type}) => {
  const [videoTracks, setVideoTracks] = useState([])
  const [audioTracks, setAudioTracks] = useState([])

  const videoRef = useRef()
  const audioRef = useRef()

  const parseTracks = trackMap => {
    return Array.from(trackMap.values())
    .map(pub => pub.track)
    .filter(track => track)
  }

  const trackSubscribe = track => {
    track.kind === "video" ?
      setVideoTracks(videoTracks => [...videoTracks, track])
    : setAudioTracks(audioTracks => [...audioTracks, track])
  }

  const trackUnsubscribe = track => {
    track.kind === "video" ?
      setVideoTracks(videoTracks => videoTracks.filter(x !== track))
    :  setAudioTracks(audioTracks => audioTracks.filter(x !== track))
  }

  useEffect(() => {
    setVideoTracks(parseTracks(transmission.videoTracks))
    setAudioTracks(parseTracks(transmission.audioTracks))
    transmission.on("trackSubscribed", trackSubscribe)
    transmission.on("trackUnsubscribed", trackUnsubscribe);

    return () => {
      setVideoTracks([])
      setAudioTracks([])
      transmission.removeAllListeners()
    }
  }, [transmission])

  useEffect(() => {
    const videoTrack = videoTracks[0]
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {videoTrack.detach()}
    }
  }, [videoTracks])

  useEffect(() => {
    const audioTrack = audioTracks[0]
    if (audioTrack) {
      audioTrack.attach(audioRef.current)
      return () => {audioTrack.detach()}
    }
  }, [audioTracks])

  return (
    <div 
      className={`rounded 
      ${type === "remote" ? "max-h-80" : ""} `}>
      <h3>{transmission.identity}</h3>
      <video ref={videoRef} autoPlay={true} className="shadow border border-neutral-800 border-2"/>
      <audio ref={audioRef} autoPlay={true}/>
    </div>

  )
}

export default Transmission
