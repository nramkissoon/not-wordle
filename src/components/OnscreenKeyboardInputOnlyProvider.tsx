import {
  lsGetOnscreenKeyboardInputOnlySetting,
  lsSetOnscreenKeyboardInputOnlySetting,
} from "@/utils/localStorage";
import { createContext, ReactNode, useState } from "react";

export type OnscreenKeyboardInputOnlySetting = "false" | "true";

type OnscreenKeyboardInputOnlyContextType = {
  setting: OnscreenKeyboardInputOnlySetting;
  toggle: () => void;
};

export const OnscreenKeyboardInputOnlyContext =
  createContext<OnscreenKeyboardInputOnlyContextType>({
    setting: "false",
    toggle: () => {},
  });

type OnscreenKeyboardInputOnlyProviderProps = {
  children: ReactNode;
};

function getDefaultSetting() {
  const defaultSetting = "false" as OnscreenKeyboardInputOnlySetting;
  const lsSetting = lsGetOnscreenKeyboardInputOnlySetting();

  if (!lsSetting) {
    lsSetOnscreenKeyboardInputOnlySetting(defaultSetting);

    return defaultSetting;
  } else {
    return lsSetting as OnscreenKeyboardInputOnlySetting;
  }
}

export const OnscreenKeyboardInputOnlyProvider: React.FC<
  OnscreenKeyboardInputOnlyProviderProps
> = ({ children }) => {
  const [setting, setSetting] = useState<OnscreenKeyboardInputOnlySetting>(
    getDefaultSetting()
  );

  function saveAndSetSetting(setting: OnscreenKeyboardInputOnlySetting) {
    lsSetOnscreenKeyboardInputOnlySetting(setting);
    setSetting(setting);
  }

  function toggle() {
    if (setting === "false") return saveAndSetSetting("true");
    else {
      saveAndSetSetting("false");
    }
  }

  return (
    <OnscreenKeyboardInputOnlyContext.Provider value={{ setting, toggle }}>
      {children}
    </OnscreenKeyboardInputOnlyContext.Provider>
  );
};
