import { CollapseToggle } from "./CollapseToggle";
import { SidebarProps } from "./Sidebar";
import { SidebarGroup } from "./SidebarGroup";
import { Logo } from "./SidebarLogo";
import { SidebarUserBlock } from "./SidebarUser";

export const SidebarPanel = ({
  groups,
  user,
  logoHref,
  isCollapsed,
  onClose,
  onToggleCollapse,
}: Omit<SidebarProps, "isOpen">) => {
  return (
    <div className="relative flex flex-col h-full">
      <CollapseToggle
        isCollapsed={isCollapsed}
        onToggle={onToggleCollapse}
      />

      <Logo collapsed={isCollapsed} href={logoHref} />

      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-2"
        aria-label="Main navigation"
      >
        {groups.map((group) => (
          <SidebarGroup
            key={group.title}
            group={group}
            isCollapsed={isCollapsed}
            onItemClick={onClose}
          />
        ))}
      </nav>

      <div className="shrink-0 py-3 border-t border-border-primary">
        <SidebarUserBlock
          user={user}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
};