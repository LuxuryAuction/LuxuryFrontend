import { SidebarItem } from "./SidebarItem";
import { NavGroup } from "./types";

interface Props {
  group: NavGroup;
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarGroup({ group, isCollapsed, onItemClick }: Props) {
  return (
    <div className="mb-1">
      {!isCollapsed ? (
        <p className="px-3.5 pt-4 pb-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-content-tertiary select-none">
          {group.title}
        </p>
      ) : (
        <div className="mx-3 my-3 h-px bg-border-primary" />
      )}

      {group.items.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          isCollapsed={isCollapsed}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}
