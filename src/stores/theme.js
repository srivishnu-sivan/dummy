import { defineStore, acceptHMRUpdate } from 'pinia'
import * as styles from '@/styles.js'
const bodyBase = 'text-base dark:bg-gray-800 dark:text-gray-100'

export const themeStore = defineStore('theme', {
    state: () => ({
        /* Styles */
    html: '',
    body: `bg-gray-50 ${bodyBase}`,
    lightBorder: 'border-gray-100',
    lightBg: 'bg-gray-100',
    aside: 'bg-gray-800',
    asideBrand: 'bg-gray-900 text-white',
    asideMenuCloseLg: 'text-white',
    asideMenuLabel: 'text-gray-400',
    asideMenuItem: 'hover:bg-gray-600 hover:bg-opacity-50',
    asideMenuItemActive: 'font-bold text-white',
    asideMenuItemActiveBg: 'bg-gray-600/50',
    asideMenuItemInactive: 'text-gray-300',
    asideSubmenuList: 'bg-gray-700 bg-opacity-50',
    asideSecondary: 'md:border-gray-600',
    navBarItemLabel: 'text-black',
    navBarItemLabelHover: 'hover:text-blue-500',
    navBarItemLabelActiveColor: 'text-blue-600',
    navBarMenuListUpperLabel: 'bg-gray-100',
    tableTr: 'lg:hover:bg-gray-100',
    tableTrOdd: 'lg:bg-gray-50',
    overlay: 'from-gray-700 via-gray-900 to-gray-700',
    asideSecondaryStyle: '',

    lightBorderStyle: '',
    lightBgStyle: '',
    asideStyle: '',
    asideBrandStyle: '',
    asideMenuCloseLgStyle: '',
    asideMenuLabelStyle: '',
    asideMenuItemStyle: '',
    asideMenuItemActiveStyle: '',
    asideMenuItemActiveBgStyle: '',
    asideMenuItemInactiveStyle: '',
    asideSubmenuListStyle: '',
    asideSecondaryStyle: '',
    navBarItemLabelStyle: '',
    navBarItemLabelHoverStyle: '',
    navBarItemLabelActiveColorStyle: '',
    navBarMenuListUpperLabelStyle: '',
    tableTrStyle: '',
    tableTrOddStyle: '',
    overlayStyle: '',

    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* FormScreen - fullscreen form layout (e.g. login page) */
    isFormScreen: false,

    /* Aside */
    isAsideVisible: true,
    isAsideCompact: false,
    isAsideMobileExpanded: false,
    secondaryMenu: null,
    isAsideHiddenLayout: false,

    /* AsideRight */
    isAsideRightActive: false,

    /* Layout */
    isBoxedLayout: false,
    isXl: false,
    isLg: false,
    isMd: false,

    /* Snackbar */
    messages: [],

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* page related*/
    pageTitle: ''

    }),
    actions: {
        setStyle(){
          document.body.className = this.body
          document.documentElement.className = this.html
        },
        responsiveLayoutControl (isFormScreen) {
            if (isFormScreen || this.isFormScreen) {
              return
            }
      
            const isXl = window.innerWidth >= 1280
            const isLg = window.innerWidth >= 1024
            const isMd = window.innerWidth >= 768
            this.layoutBreakpoints(isXl, isLg, isMd)
            if (isXl) {
                this.asideCompactToggle(true)
                this.asideHiddenLayoutToggle(false)
            } else if (isLg) {
                this.asideCompactToggle(false)
                this.asideHiddenLayoutToggle(true)
            } else {
                this.asideCompactToggle(false)
                this.asideHiddenLayoutToggle(false)
            }
          },
          layoutBreakpoints (payload) {
            this.isXl = payload.isXl
            this.isLg = payload.isLg
            this.isMd = payload.isMd
          },

          pushMessage (payload) {
            const ts = Date.now()
            const text = payload
            this.messages.push({ ts, text})
          },

          shiftMessage (){
            this.messages.shift()
          },

          setPageTitle(title) {
            this.pageTitle = title
          },

          asideCompactToggle (payload = null) {
            const isShow = payload !== null ? payload : !this.isAsideCompact
      
            document.documentElement.classList[isShow ? 'add' : 'remove']('aside-compact')
            this.isAsideCompact = isShow
          },
          asideHiddenLayoutToggle (payload = null) {
            const isHide = payload !== null ? payload : !this.isAsideHiddenLayout
      
            document.documentElement.classList[isHide ? 'add' : 'remove']('aside-none')
            this.isAsideHiddenLayout = isHide
            this.asideVisibilityToggle(!isHide)
          },
          asideVisibilityToggle ( payload = null) {
            const isVisible = payload !== null ? payload : !this.isAsideVisible
            this.isAsideVisible = isVisible
          },
          darkModeTrigger (payload = null) {
            const value = payload !== null ? payload : !this.darkMode
      
            document.documentElement.classList[value ? 'add' : 'remove']('dark')
      
            // localStorage.setItem(darkModeKey, value ? '1' : '0')
            this.darkMode = value
          },
          asideMobileToggle ( payload = null) {
            const isShow = payload !== null ? payload : !this.isAsideMobileExpanded
      
            document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped', 'mobile-aside-active')
            this.isAsideMobileExpanded = isShow
          },
          formScreenToggle (payload) {
            this.isFormScreen = payload
            if (!this.isAsideHiddenLayout) {
              this.isAsideVisible = !payload
            }
            document.documentElement.classList[payload ? 'add' : 'remove']('form-screen')
          },
    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(themeStore, import.meta.hot))
}