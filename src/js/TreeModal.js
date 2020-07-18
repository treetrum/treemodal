import wrapEl from "./utils/wrapEl";

const DEFAULT_OPTIONS = {
    selector: "[data-treemodal]",
    zIndex: 9999,
    classes: {
        active: "is-open",
    },
    callbacks: {
        onShow: () => {},
        onHide: () => {},
    },
    autoOpen: false,
};

const mergeOptions = (custom) => {
    const customised = { ...DEFAULT_OPTIONS, ...custom };
    customised.classes = {
        ...DEFAULT_OPTIONS.classes,
        ...(custom.classes || {}),
    };
    customised.callbacks = {
        ...DEFAULT_OPTIONS.callbacks,
        ...(custom.callbacks || {}),
    };
    return customised;
};
class TreeModal {
    constructor(el, options = DEFAULT_OPTIONS) {
        if (!el) {
            return;
        }
        this.el = el;
        this.isShown = false;
        this.options = mergeOptions(options);
        this.id = el.getAttribute("data-treemodal");
        this.create();
        this.addEventListeners();
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
        window.addEventListener("keyup", (event) => {
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
        this.wrap.style.zIndex = this.options.zIndex;

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
        document.body.appendChild(this.wrap);
    };

    show = () => {
        this.wrap.classList.add(this.options.classes.active);
        this.options.callbacks.onShow(this);
        requestAnimationFrame(() => {
            this.isShown = true;
        });
    };

    hide = () => {
        this.wrap.classList.remove(this.options.classes.active);
        this.options.callbacks.onHide(this);
        requestAnimationFrame(() => {
            this.isShown = false;
        });
    };
}

const init = (options = DEFAULT_OPTIONS) => {
    const settings = mergeOptions(options);
    const els = document.querySelectorAll(settings.selector);
    els.forEach((el) => {
        new TreeModal(el, settings);
    });
};

export default {
    init,
    TreeModal,
};
