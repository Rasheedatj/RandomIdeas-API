import IdeasApi from '../services/ideaAPI';
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this._username = localStorage.getItem('username');
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEvent() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const dataId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(dataId);
      }
    });
  }

  async deleteIdea(id) {
    try {
      await IdeasApi.deleteIdea(id);
      this._ideas.filter((idea) => idea.id !== id);
      this.getIdeas();
    } catch (error) {
      alert('You are not authorized to delete this resource');
    }
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        return `  <div class="card" data-id="${idea._id}">

        ${
          this._username === idea.username
            ? `<button class='delete'>
              <i class='fas fa-times'></i>
            </button>`
            : ''
        }
        <h3>
         ${idea.text}
        </h3>
        <p class="tag  ${this.getTagClass(
          idea.tag
        )}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date.slice(0, 10)}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>`;
      })
      .join('');
    this.addEvent();
  }
}
export default IdeaList;
