import styles from '../../scss/modal.scss';
import { createDivEl } from '../utils';
import { Spinner } from './Spinner';
import { body } from '../const';

class Modal2 {
  constructor({ title, description, submitText }) {
    this.contentElement = null;
    this.cancelHandler = null;
    this.submitHandler = null;
    this.element = this._create({ title, description, submitText });
  }

  _create({ title, description, submitText }) {
    const root = createDivEl({ className: styles['modal-root'] });
    const modal = createDivEl({ className: styles['modal-body'] });
    root.appendChild(modal);

    const titleText = createDivEl({ className: styles['modal-title'], content: title });
    modal.appendChild(titleText);

    const desc = createDivEl({ className: styles['modal-desc'], content: description });
    modal.appendChild(desc);

    this.contentElement = createDivEl({ className: styles['modal-content'] });
    modal.appendChild(this.contentElement);

    const bottom = createDivEl({ className: styles['modal-bottom'] });
    modal.appendChild(bottom);

    const submit = createDivEl({ className: styles['modal-submit'], content: submitText });
    submit.addEventListener('click', () => {
      Spinner.start(modal);
      if (this.submitHandler) {
        this.submitHandler();
      }
    });
    bottom.appendChild(submit);

    return root;
  }

  close() {
    if (body.contains(this.element)) {
      body.removeChild(this.element);
    }
  }

  render() {
    if (!body.querySelector(`.${styles['modal-root']}`)) {
      body.appendChild(this.element);
    }
  }
}

export { Modal2 as Modal2 };
