interface CloudFlareProps {
  id?: string | null;
  variant?: 'public' | 'avatar';
}

export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function cfUrl({ id = '', variant = 'public' }: CloudFlareProps) {
  return `https://imagedelivery.net/jbwEg65i9cpROIJIsZXQBA/${id}/${variant}`;
}
