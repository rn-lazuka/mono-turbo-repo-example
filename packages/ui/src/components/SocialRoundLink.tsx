import { ReactNode } from "react";

import type { SvgIconComponent } from "@mui/icons-material";
import type { SvgIconProps } from "@mui/material";
import Link from "@mui/material/Link";

export interface SocialRoundLinkProps {
  url: string;
  icon: SvgIconComponent | ((props: SvgIconProps) => ReactNode);
}
export const SocialRoundLink = ({ url, icon: Icon }: SocialRoundLinkProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      sx={{
        borderRadius: "50%",
        bgcolor: "background.paper",
        color: "icon.dark",
        p: 1.25,
        cursor: "pointer",
        display: "flex",
      }}
    >
      <Icon sx={{ fontSize: 16 }} />
    </Link>
  );
};
