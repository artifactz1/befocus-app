'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select'
import { Separator } from '@repo/ui/separator'
import { Slider } from '@repo/ui/slider'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useSoundsStore } from '~/store/useSoundsStore'

export default function AlarmSoundsButton() {
  const { sounds, alarmId, setAlarmId, setVolume, toggleSound, isSoundSettingsOpen } =
    useSoundsStore()

  const sound = sounds[alarmId]

  const [isPlaying, setIsPlaying] = useState(false) // Local state to manage ReactPlayer's playing state

  // Set ReactPlayer to not play when popover is open
  useEffect(() => {
    if (isSoundSettingsOpen) {
      setIsPlaying(false) // Stop sound when the popover is open
    }
  }, [isSoundSettingsOpen])

  // Update ReactPlayer's playing state when a new sound is selected
  const handleSelectChange = (value: string) => {
    if (value) {
      setAlarmId(value) // Safely update alarmId
      toggleSound(value) // Trigger sound toggle
      setIsPlaying(true) // Start playing the sound when a new alarm is selected
    } else {
      console.warn('Invalid value selected:', value)
    }
  }

  if (!sound) return null

  return (
    <div>
      <ReactPlayer
        url={sound.url} // Replace with your media URL
        playing={isPlaying} // Controlled by state
        volume={sound.volume}
        controls={false}
        width='0'
        height='0'
        onReady={() => console.log('Player is ready')}
        onStart={() => console.log('Video started')}
      />

      <Separator className='my-4 hidden bg-white md:block' />
      <h3 className='mb-3 text-left font-semibold'>Alarm Sound</h3>
      <div className='flex flex-row space-x-2'>
        <Select
          value={alarmId} // Ensure value is a string
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className='w-1/3'>
            <SelectValue placeholder='Select an alarm' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(sounds)
                .filter(soundId => sounds[soundId]?.soundType === 'alarm') // Only alarm sounds
                .map(soundId => (
                  <SelectItem key={soundId} value={soundId}>
                    {soundId}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='flex w-full items-center space-y-2'>
          {/* <label className="block text-center text-sm">Volume</label> */}
          <Slider
            value={[sound.volume * 100]} // Default to the current volume (range 0-100)
            onValueChange={value => {
              const newVolume = value[0] ?? 80 // Default to 80 if value is undefined
              setVolume(alarmId, newVolume / 100) // Set volume globally (range 0-1)
            }}
            max={100}
            step={1}
            className='w-full'
          />
        </div>
      </div>
    </div>
  )
}
