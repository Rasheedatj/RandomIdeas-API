class IdeaForm {
  constructor() {
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

  _submitForm(e) {
    e.preventDefault();
    const form = new FormData(this._form);

    const idea = {
      text: form.get('text'),
      tag: form.get('tag'),
      username: form.get('username'),
    };

    // Clear fields
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    document.dispatchEvent(new Event('closemodal'));

    console.log(idea);
  }

  addEventListener() {
    this._form.addEventListener('submit', this._submitForm.bind(this));
  }
}

export default IdeaForm;
