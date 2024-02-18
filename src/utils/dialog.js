import { ref, h, render, defineAsyncComponent } from "vue";
const dialog = defineAsyncComponent(() => import("@/components/Dialog.vue"));

const showDialog = function(msg) {
    let d = document.createElement("div");
    render(h(dialog, {
        msg: msg
    }), d);

    document.body.appendChild(d);
    setTimeout(() => {
        document.body.removeChild(d);
    }, 1500);
}

export { showDialog };