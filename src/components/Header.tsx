import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  TextAlignRightIcon,
  QuestionMarkCircledIcon,
  GearIcon,
} from "@radix-ui/react-icons";

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
        <ToolbarButton>
          <GearIcon height={svgHW} width={svgHW} />
        </ToolbarButton>
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
