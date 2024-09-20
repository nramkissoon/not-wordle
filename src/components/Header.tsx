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
import {
  GameStateContext,
  TileProps,
  canChangeMode,
} from "./GameStateProvider";
import { ThemeContext, Themes } from "./ThemeProvider";
import { OnscreenKeyboardInputOnlyContext } from "./OnscreenKeyboardInputOnlyProvider";
import { Tile } from "./GameBoard";
import { cn } from "@/utils";

const svgHW = 24;

export function Header() {
  return (
    <nav
      className={clsx(
        "flex items-center justify-between border-b px-3 mb-6 h-14",
        "dark:border-absent-dark high-contrast-dark:border-absent-hc_dark light:border-keyboard-light high-contrast:border-keyboard-hc"
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
        <RulesDialog />
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

const correctTileBgStyles = {
  "high-contrast": "bg-correct-hc",
  light: "bg-correct-light",
  dark: "bg-correct-dark",
  "high-contrast-dark": "bg-correct-hc_dark",
};

const presentTileBgStyles = {
  "high-contrast": "bg-present-hc",
  light: "bg-present-light",
  dark: "bg-present-dark",
  "high-contrast-dark": "bg-present-hc_dark",
};

const absentTileBgStyles = {
  "high-contrast": "bg-absent-hc",
  light: "bg-absent-light",
  dark: "bg-absent-dark",
  "high-contrast-dark": "bg-absent-hc_dark",
};

const emptyTileBgStyles = {
  "high-contrast": "",
  light: "",
  dark: "",
  "high-contrast-dark": "",
};

const uncheckedTileBgStyles = {
  "high-contrast": "",
  light: "",
  dark: "",
  "high-contrast-dark": "",
};

const tileBackgroundMap = {
  correct: correctTileBgStyles,
  present: presentTileBgStyles,
  absent: absentTileBgStyles,
  empty: emptyTileBgStyles,
  unchecked: uncheckedTileBgStyles,
};

const emptyTileBorderStyles = {
  "high-contrast": "border-2 border-keyboard-hc",
  light: "border-2 border-keyboard-light",
  dark: "border-2 border-absent-dark",
  "high-contrast-dark": "border-2 border-absent-hc_dark",
};

// no border for filled tiles
const filledTileBorderStyles = {
  "high-contrast": "",
  light: "",
  dark: "",
  "high-contrast-dark": "",
};

const uncheckedTileBorderStyles = {
  "high-contrast": "border-2 border-absent-hc",
  light: "border-2 border-absent-light",
  dark: "border-2 border-absent-light/80",
  "high-contrast-dark": "border-2 border-absent-hc/80",
};

const tileBorderMap = {
  empty: emptyTileBorderStyles,
  unchecked: uncheckedTileBorderStyles,
  correct: filledTileBorderStyles,
  present: filledTileBorderStyles,
  absent: filledTileBorderStyles,
};

const tileTextColorMap = {
  empty: {
    "high-contrast": "text-wordleBlack",
    light: "text-wordleBlack",
    dark: "text-white",
    "high-contrast-dark": "text-white",
  },
  unchecked: {
    "high-contrast": "text-wordleBlack",
    light: "text-wordleBlack",
    dark: "text-white",
    "high-contrast-dark": "text-white",
  },
  correct: {
    "high-contrast": "text-white",
    light: "text-white",
    dark: "text-white",
    "high-contrast-dark": "text-white",
  },
  present: {
    "high-contrast": "text-white",
    light: "text-white",
    dark: "text-white",
    "high-contrast-dark": "text-white",
  },
  absent: {
    "high-contrast": "text-white",
    light: "text-white",
    dark: "text-white",
    "high-contrast-dark": "text-white",
  },
};

function MiniTile(props: TileProps) {
  const { theme } = useContext(ThemeContext);
  const { state } = props;
  const bg = tileBackgroundMap[state][theme];
  const border = tileBorderMap[state][theme];
  const textColor = tileTextColorMap[state][theme];
  return (
    <Tile
      className={cn("w-8 h-8 text-2xl font-bold", bg, border, textColor)}
      {...props}
    />
  );
}

function RulesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ToolbarButton>
          <QuestionMarkCircledIcon height={svgHW} width={svgHW} />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent
        className="max-w-lg rounded-md dark:bg-wordleBlack"
        aria-describedby="settings"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-left">
            How To Play
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 w-full text-left">
          <p className="w-full">Guess the word in 6 tries.</p>
          <ul>
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
          <div className="w-full">
            <p className="font-bold text-left w-full mb-3">Examples</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <MiniTile state="correct" value="w" />
                  <MiniTile state="unchecked" value="o" />
                  <MiniTile state="unchecked" value="r" />
                  <MiniTile state="unchecked" value="d" />
                  <MiniTile state="unchecked" value="y" />
                </div>
                <p>
                  <span className="font-bold">W</span> is in the word and in the
                  correct spot.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <MiniTile state="unchecked" value="l" />
                  <MiniTile state="present" value="i" />
                  <MiniTile state="unchecked" value="g" />
                  <MiniTile state="unchecked" value="h" />
                  <MiniTile state="unchecked" value="t" />
                </div>
                <p>
                  <span className="font-bold">I</span> is in the word but in the
                  wrong spot.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <MiniTile state="unchecked" value="r" />
                  <MiniTile state="unchecked" value="o" />
                  <MiniTile state="unchecked" value="g" />
                  <MiniTile state="absent" value="u" />
                  <MiniTile state="unchecked" value="e" />
                </div>
                <p>
                  <span className="font-bold">U</span> is not in the word in any
                  spot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
