import store from '@/store';

export const isAuthenticated = (to, from, next) => {
  if (store.state.user) {
    next();
  } else {
    next('/login');
  }
};

export const isGuest = (to, from, next) => {
  if (!store.state.user) {
    next();
  } else {
    next({ path: from.path });
  }
};


