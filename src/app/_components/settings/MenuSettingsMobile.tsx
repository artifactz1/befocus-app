"use client";

import ToDoListMobile from "../to-do-list/ToDoListMobile";
import SoundSettingsMobile from './SoundSettingsMobile';

export default function MenuSettingsMobile() {
  return (
    <main className="block sm:hidden">
      <ToDoListMobile />
      <SoundSettingsMobile/>
    </main>
  );
}
