/**
 * Created by zhangmei on 2019/1/4
 */


class DialogMask {
    constructor(option) {
        this.params = option || {};
        this.createMask();
    }

    handleTouchMove(e) {
        if (e.target === e.currentTarget) e.preventDefault();

    }

    createMask() {
        if (document.querySelectorAll('.dialog-mask').length <= 0) {
            let mask = document.createElement('div');
            this.mask = mask;
            mask.style.opacity = '0';
            mask.classList.add('dialog-mask');
            mask.style.display = 'none';
            document.body.appendChild(mask);
        } else {
            this.mask = document.querySelector('.dialog-mask');
        }
        this.bindEvent();
    }

    handleClick() {
        if (this.params.hideOnMask) {
            this.hide();
            this.params.onHide()
        }
    }

    bindEvent() {
        this.mask.addEventListener('touchmove', this.handleTouchMove);
        this.mask.addEventListener("click", this.handleClick.bind(this));
    }

    show() {
        if (this.mask) {
            this.mask.style.zIndex = this.params.zIndex || 100;
            setTimeout(() => {
                this.mask.style.opacity = 1;
            }, 50);
            this.mask.style.display = 'block';
        }
    }

    destroy() {
        if (this.mask) {
            this.mask.removeEventListener('touchmove', this.handleTouchMove);
            this.mask.parentNode.removeChild(this.mask);
        }
    }

    hide() {
        if (this.mask) {
            this.mask.style.display = 'none';
            setTimeout(() => {
                this.mask.style.opacity = 0;
            }, 50)
        }
    }
}

export default DialogMask;
