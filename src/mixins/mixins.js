let mixins = {
    data() {
        return {
            screenWidth: document.body.clientWidth,
            currScreenSize: 'lg',
        }
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
                // console.log('currScreenSize', newValue)
            }
        },
    },
    methods: {
    }
}

export default mixins