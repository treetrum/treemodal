import treemodal from "../dist/TreeModal";

treemodal.init({
    callbacks: {
        onShow: () => {
            console.log("Showing");
        },
        onHide: () => {
            console.log("Hiding");
        },
    },
});
