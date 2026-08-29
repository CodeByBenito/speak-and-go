import { caminhoDe, PageType } from '@/lib/rotas';
import React from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  name: string;
}

interface MorphicNavbarProps {
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
}

export function MorphicNavbar({
  items,
  activeId,
  onNavigate,
  className,
}: MorphicNavbarProps) {
  const isActiveLink = (id: string) => activeId === id;

  return (
    <nav className={cn("flex items-center justify-center", className)} aria-label="Navegação principal">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between p-1 rounded-2xl bg-[#141210]/90 border border-[#241F1B] backdrop-blur-md shadow-lg">
          {items.map(({ id, name }, index, array) => {
            const isActive = isActiveLink(id);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevId = index > 0 ? array[index - 1].id : null;
            const nextId = index < array.length - 1 ? array[index + 1].id : null;

            return (
              <a
                key={id}
                href={caminhoDe(id as PageType)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={cn(
                  "flex items-center justify-center py-2 px-4 text-[14px] md:text-[15px] font-medium transition-all duration-300 select-none cursor-pointer whitespace-nowrap",
                  isActive
                    ? "mx-1.5 rounded-xl font-bold bg-[#26201B] text-[#FFFDF9] shadow-md border border-[#3A322B]"
                    : cn(
                        "text-[#9B9188] hover:text-[#FFFDF9] hover:bg-[#1A1816]/60",
                        (isActiveLink(prevId || "") || isFirst) && "rounded-l-xl",
                        (isActiveLink(nextId || "") || isLast) && "rounded-r-xl"
                      )
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MorphicNavbar;
