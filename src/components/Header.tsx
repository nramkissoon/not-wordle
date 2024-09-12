import clsx from "clsx";

export function Header() {
  return (
    <nav
      className={clsx(
        "flex items-center justify-between py-4 border-b px-3 mb-6",
        "dark:border-absent-dark high-contrast-dark:border-absent-hc_dark light:border-absent-light high-contrast:border-absent-hc"
      )}
    >
      <div className="text-sm font-bold">NotWordle</div>
    </nav>
  );
}
