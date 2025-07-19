import gravatar from 'gravatar';

export const generateAvatar = (email) => gravatar.url(email, { protocol: 'https' });