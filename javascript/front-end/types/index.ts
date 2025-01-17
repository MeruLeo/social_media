import React, { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface SidebarLinkProps {
    href: string;
    icon: ReactNode;
    label: string;
}
