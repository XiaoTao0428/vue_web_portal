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
        contentClassName() {
            let name = ''
            if (this.currScreenSize === 'lg') {
                name = 'content-lg'
            }
            if (this.currScreenSize === 'md') {
                name = 'content-md'
            }
            if (this.currScreenSize === 'sm') {
                name = 'content-sm'
            }
            if (this.currScreenSize === 'xs') {
                name = 'content-xs'
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
    },
    watch: {
        screenWidth: {
            immediate: true,
            handler(newValue) {
                if (newValue >= 1440) {
                    this.currScreenSize = 'lg'
                }else if (newValue >= 970 && newValue < 1440) {
                    this.currScreenSize = 'md'
                }else if (newValue >= 768 && newValue < 1440) {
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