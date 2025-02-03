"use client";

import { Separator } from "~/components/ui/separator";
import { useSoundsStore } from "~/store/useSoundsStore";
import SoundButton from "./SoundButton";

export default function BgMusicSoundsButton() {
  const { sounds } = useSoundsStore();

  return (
    <main>
      <Separator className="my-4 bg-white" />
      <h3 className="text-center font-semibold mb-3"> Music Sounds</h3>
      <div className="space-y-4">
        {Object.keys(sounds)
          .filter((soundId) => sounds[soundId]?.soundType === "bgMusic")
          .map((soundId) => (
            <SoundButton key={soundId} soundId={soundId} />
          ))}
      </div>
    </main>
  );
}
