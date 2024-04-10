import ideaAPI from '../services/ideaAPI';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this.ideaList = new IdeaList();
    this._formModal = document.querySelector('#form-modal');
    this.render();
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>`;
    this._form = document.querySelector('#idea-form');
    this.addEventListener();
  }

  async _submitForm(e) {
    e.preventDefault();
    const form = new FormData(this._form);

    if (!form.get('text') || !form.get('tag') || !form.get('username')) {
      alert('Please enter all fields');
      return;
    }

    const idea = {
      text: form.get('text'),
      tag: form.get('tag'),
      username: form.get('username'),
    };

    // add idea to server
    const newIdea = await ideaAPI.createIdea(idea);

    // add idea to list
    this.ideaList.addIdeaToList(newIdea.data.data);

    // add username to localStorage
    localStorage.setItem('username', idea.username);

    // Clear fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.ideaList.render();

    document.dispatchEvent(new Event('closemodal'));
  }

  addEventListener() {
    this._form.addEventListener('submit', this._submitForm.bind(this));
  }
}

export default IdeaForm;
