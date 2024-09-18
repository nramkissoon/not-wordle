import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode, useContext } from "react";
import {
  TextAlignRightIcon,
  QuestionMarkCircledIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Switch } from "@/shadcn/ui/switch";
import { GameStateContext, canChangeMode } from "./GameStateProvider";
import { ThemeContext, Themes } from "./ThemeProvider";
import { OnscreenKeyboardInputOnlyContext } from "./OnscreenKeyboardInputOnlyProvider";

const svgHW = 24;

export function Header() {
  return (
    <nav
      className={clsx(
        "flex items-center justify-between border-b px-3 mb-6 h-14",
        "dark:border-absent-dark high-contrast-dark:border-absent-hc_dark light:border-absent-light high-contrast:border-absent-hc"
      )}
    >
      <div className="text-md font-bold">NotWordle</div>
      <div className="flex h-full">
        <ToolbarButton>
          <TextAlignRightIcon
            height={svgHW}
            width={svgHW}
            transform="rotate(90)"
          />
        </ToolbarButton>
        <ToolbarButton>
          <QuestionMarkCircledIcon height={svgHW} width={svgHW} />
        </ToolbarButton>
        <SettingsMenu />
      </div>
    </nav>
  );
}

function ToolbarButton({
  children,
  ...rest
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="light:hover:bg-keyboard-light high-contrast:hover:bg-keyboard-hc dark:hover:bg-absent-dark high-contrast-dark:hover:bg-absent-hc_dark h-full w-12 flex items-center justify-center"
      {...rest}
    >
      {children}
    </button>
  );
}

function getHrStyles(theme: Themes) {
  if (theme === "dark") return "border-absent-dark w-full";
  if (theme === "high-contrast-dark") return "border-absent-hc_dark w-full";
  if (theme === "light") return "border-keyboard-light w-full";
  if (theme === "high-contrast") return "border-keyboard-hc w-full";
}

function SettingsMenu() {
  const { gameMode, toggleGameMode, board } = useContext(GameStateContext);
  const { theme, toggleColorMode, toggleHighContrast } =
    useContext(ThemeContext);
  const { setting, toggle } = useContext(OnscreenKeyboardInputOnlyContext);
  const hrStyles = getHrStyles(theme);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ToolbarButton>
          <GearIcon height={svgHW} width={svgHW} />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent
        className="max-w-lg rounded-md dark:bg-wordleBlack"
        aria-describedby="settings"
      >
        <DialogHeader>
          <DialogTitle className="text-sm text-center">SETTINGS</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex justify-between gap-2 items-center w-full">
            <div className="font-light">
              Hard Mode
              <p className="text-2xs">
                Any revealed hints must be used in subsequent guesses
              </p>
            </div>
            <Switch
              disabled={!canChangeMode(board)}
              checked={gameMode === "hard"}
              value={gameMode}
              onCheckedChange={toggleGameMode}
            />
          </div>
          <hr className={hrStyles} />
          <div className="flex justify-between gap-2 items-center w-full">
            <div className="font-light">Dark Theme</div>
            <Switch
              checked={theme === "dark" || theme === "high-contrast-dark"}
              value={theme}
              onCheckedChange={toggleColorMode}
            />
          </div>
          <hr className={hrStyles} />
          <div className="flex justify-between gap-2 items-center w-full">
            <div className="font-light">
              High Contrast Mode
              <p className="text-2xs">
                Contrast and colorblindness improvements
              </p>
            </div>
            <Switch
              checked={
                theme === "high-contrast" || theme === "high-contrast-dark"
              }
              value={theme}
              onCheckedChange={toggleHighContrast}
            />
          </div>
          <hr className={hrStyles} />
          <div className="flex justify-between gap-2 items-center w-full">
            <div className="font-light">
              Onscreen Keyboard Input Only
              <p className="text-2xs">
                Ignore key input except from the onscreen keyboard. Most helpful
                for users using speech recognition or other assistive devices.
              </p>
            </div>
            <Switch
              value={setting}
              checked={setting === "true"}
              onCheckedChange={toggle}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
