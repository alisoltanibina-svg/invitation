import { useCallback, useEffect, useState } from "react";
import { ambient } from "@/lib/ambient";
import { Cover } from "./cover";
import { Inner } from "./inner";

const OPEN_KEY = "esra-mohammadsadegh-opened";

export function InvitationApp() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(OPEN_KEY) === "1") {
        setOpened(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (opening || opened) return;
    setOpening(true);
    void ambient.start().then(() => setMusicOn(true));
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
      try {
        sessionStorage.setItem(OPEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 900);
  }, [opening, opened]);

  const toggleMusic = useCallback(() => {
    setMusicOn(ambient.playing);
  }, []);

  if (!opened) {
    return <Cover opening={opening} onOpen={handleOpen} />;
  }

  return <Inner musicOn={musicOn} onMusicToggle={toggleMusic} />;
}
