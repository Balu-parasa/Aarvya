'use client';

import React from 'react';
import {
  Link as RouterLink,
  useNavigate as useRouterNavigate,
  useLocation as useRouterLocation,
  useSearchParams as useRouterSearchParams,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

export interface NextLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string | { pathname: string; query?: Record<string, string> };
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  replace?: boolean;
}

export function Link({ href, children, className = '', onClick, replace, ...props }: NextLinkProps) {
  let to = typeof href === 'string' ? href : href.pathname;
  if (typeof href === 'object' && href.query) {
    const params = new URLSearchParams(href.query);
    to += `?${params.toString()}`;
  }

  // Support in-page anchor links like #privacy-by-design
  if (to.startsWith('#')) {
    return (
      <a href={to} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} className={className} onClick={onClick} replace={replace} {...props}>
      {children}
    </RouterLink>
  );
}

export default Link;

export function useRouter() {
  const navigate = useRouterNavigate();
  const location = useRouterLocation();

  return {
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    pathname: location.pathname,
  };
}

export function usePathname() {
  const location = useRouterLocation();
  return location.pathname;
}

export function useSearchParams() {
  const [searchParams] = useRouterSearchParams();
  return searchParams;
}
