let mixins = {
    data() {
        return {
            screenWidth: document.body.clientWidth,
            currScreenSize: 'lg',
        }
    },
    computed: {
        headerClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'header-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'header-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'header-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'header-xs'
            }
            return name
        },
        menuWarpClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'menu-warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'menu-warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'menu-warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'menu-warp-xs'
            }
            return name
        },
        homeClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'home_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'home_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'home_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'home_warp-xs'
            }
            return name
        },
        footerClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'footer-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'footer-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'footer-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'footer-xs'
            }
            return name
        },
        pageHeaderBlockClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'pageHeaderBlock_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'pageHeaderBlock_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'pageHeaderBlock_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'pageHeaderBlock_warp-xs'
            }
            return name
        },
        imageTextCardClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'imageTextCard_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'imageTextCard_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'imageTextCard_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'imageTextCard_warp-xs'
            }
            return name
        },
        researchClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'research_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'research_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'research_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'research_warp-xs'
            }
            return name
        },
        newsClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'news_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'news_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'news_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'news_warp-xs'
            }
            return name
        },
        publicationsClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'publications_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'publications_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'publications_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'publications_warp-xs'
            }
            return name
        },
        peopleClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'people_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'people_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'people_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'people_warp-xs'
            }
            return name
        },
        peopleCardClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'peopleCard_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'peopleCard_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'peopleCard_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'peopleCard_warp-xs'
            }
            return name
        },
        newDetailsPageClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'newDetailsPage_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'newDetailsPage_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'newDetailsPage_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'newDetailsPage_warp-xs'
            }
            return name
        },
        customPageClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'customPage_warp-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'customPage_warp-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'customPage_warp-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'customPage_warp-xs'
            }
            return name
        },


    },
    watch: {
        screenWidth: {
            immediate: true,
            handler(newValue) {
                if (newValue >= 1200) {
                    this.currScreenSize = 'lg'
                }else if (newValue >= 992 && newValue < 1200) {
                    this.currScreenSize = 'md'
                }else if (newValue >= 768 && newValue < 992) {
                    this.currScreenSize = 'sm'
                }else {
                    this.currScreenSize = 'xs'
                }
            }
        },
        currScreenSize: {
            immediate: true,
            handler(newValue) {
                console.log('currScreenSize', newValue)
            }
        },
    },
    created() {
        const that = this
        window.addEventListener("resize", function() {
            return (() => {
                window.screenWidth= document.body.clientWidth;
                that.screenWidth= window.screenWidth;
            })();
        });
    },
    methods: {
    }
}

export default mixins