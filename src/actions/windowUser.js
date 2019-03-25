export const screenResize = desctop => ({
        type: 'SCREEN_RESIZE',
        payload: desctop
});

export const setVisbleSideBar = sideBarVisible => ({
        type: 'VISBLE_SIDEBAR',
        payload: sideBarVisible
});

export const changeMenu = changeMenu => ({
        type: 'CHANGE_MENU',
        payload: changeMenu
});
