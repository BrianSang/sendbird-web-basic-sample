import styles from '../../scss/admin-message-modal.scss';
import { createDivEl, errorAlert, protectFromXSS } from '../utils';
import { SendBirdAction } from '../SendBirdAction';
import { Spinner } from './Spinner';
import { Modal2 } from './Modal2';
import { Chat } from '../Chat';

const title = 'Today\'s Quote';
const description = 'Admin Message';
const submitText = 'OK';

class AdminMessageModal extends Modal2 {
  constructor({ channel, message, data }) {
    super({ title, description, submitText });
    this.channel = channel;
    this.message = message;
    this.data = data;
    this._createElement();
    this._createHandler();
  }

  _createElement() {
    const content = createDivEl({
      className: styles['modal-admin-message'],
      content: this.message.isFileMessage() ? protectFromXSS(this.message.name) : protectFromXSS(this.message.message) + 
      "<br>" + protectFromXSS(this.message.data.replace(/"/g, '').replace(/{/g,'').replace(/}/g,'')) 
    });
    this.contentElement.appendChild(content);
  }

  _createHandler() {
    this.submitHandler = () => {
        Spinner.remove();
        this.close();
    };
  }
}

export { AdminMessageModal as AdminMessageModal };
