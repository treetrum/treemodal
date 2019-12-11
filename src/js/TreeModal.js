import wrapEl from "./utils/wrapEl";

class TreeModal {
    static init = () => {
        const els = document.querySelectorAll("[data-treemodal]");
        els.forEach(el => {
            new TreeModal(el);
        });
    };

    static DEFAULT_OPTIONS = {
        classes: {
            active: "is-open"
        },
        callbacks: {
            onShow: () => {},
            onHide: () => {}
        },
        autoOpen: false
    };

    constructor(el, options = {}) {
        if (!el) {
            return;
        }
        this.el = el;
        this.isShown = false;
        this.options = { ...TreeModal.DEFAULT_OPTIONS, ...options };
        this.id = el.getAttribute("data-treemodal");
        this.create();
        this.addEventListeners();

        console.log(this);

        if (this.options.autoOpen) {
            this.show();
        }
    }

    addEventListeners() {
        // Handle openers
        window.addEventListener("click", ({ target }) => {
            const selector = `[data-treemodal-target="${this.id}"]`;
            if (target.matches(`${selector}, ${selector} *`)) {
                this.show();
            }
        });

        // Handle overlay click to close
        window.addEventListener("click", ({ target }) => {
            if (this.isShown) {
                const innerSelector = `.treemodal__inner`;
                if (!target.matches(`${innerSelector}, ${innerSelector} *`)) {
                    this.hide();
                }
            }
        });

        // Handle close button to close
        this.close.addEventListener("click", this.hide);

        // Handle escape to close
        window.addEventListener("keyup", event => {
            if (this.isShown && event.key === "Escape") {
                this.hide();
            }
        });
    }

    create = () => {
        // Create wrapper
        this.wrap = document.createElement("div");
        this.wrap.classList.add("treemodal");
        this.wrap.setAttribute("data-treemodal-id", this.id);

        // Create inner
        this.inner = document.createElement("div");
        this.inner.classList.add("treemodal__inner");

        // Wrap main el
        wrapEl(this.el, this.inner);
        wrapEl(this.inner, this.wrap);

        // Insert close button
        this.wrap.insertAdjacentHTML(
            "afterbegin",
            `<div class="treemodal__close">
        		<button class="treemodal__close__button">
        			<div class="css-close"></div>
        		</button>
        	</div>`
        );
        this.close = this.wrap.querySelector(".treemodal__close__button");
    };

    show = () => {
        this.wrap.classList.add(this.options.classes.active);
        this.options.callbacks.onShow();
        requestAnimationFrame(() => {
            this.isShown = true;
        });
    };

    hide = () => {
        this.wrap.classList.remove(this.options.classes.active);
        this.options.callbacks.onHide();
        requestAnimationFrame(() => {
            this.isShown = false;
        });
    };
}

export default TreeModal;
