export const toggle = {
    data() {
        return {
            info: {
                isshow: false,
                isAdd: true,
            },
        };
    },
    methods: {

        willAdd() {
            this.info.isshow = true;
            this.info.isAdd = true;
        },
        willEdit(id) {
            this.info.isshow = true;
            this.info.isAdd = false;
            this.$refs.form.getOne(id);
        },
    },
}

export const formCancel = {
    methods: {
        // 取消
        cancel() {
            this.info.isshow = false;
        },
        //弹框关闭时，清空表单数据
        closed() {
            if (!this.info.isAdd) {
                this.empty();
            }
        },
    }
}