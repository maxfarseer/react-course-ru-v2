import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

const myNews = [
  {
    id: 1,
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText:
      'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.',
  },
  {
    id: 2,
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!',
  },
  {
    id: 3,
    author: 'Max Frontend',
    text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
    bigText: 'А евро опять выше 70.',
  },
  {
    id: 4,
    author: 'Гость',
    text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
    bigText:
      'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!',
  },
]

class Article extends React.Component {
  state = {
    visible: false,
  }
  handleReadMoreClck = e => {
    e.preventDefault()
    this.setState({ visible: true })
  }
  render() {
    const { author, text, bigText } = this.props.data
    const { visible } = this.state
    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        {!visible && (
          <a
            onClick={this.handleReadMoreClck}
            href="#"
            className="news__readmore"
          >
            Подробнее
          </a>
        )}
        {visible && <p className="news__big-text">{bigText}</p>}
      </div>
    )
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // добавили id, это число, обязательно
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired,
  }),
}

class News extends React.Component {
  renderNews = () => {
    const { data } = this.props
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function(item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return newsTemplate
  }
  render() {
    const { data } = this.props

    return (
      <div className="news">
        {this.renderNews()}
        {data.length ? (
          <strong className={'news__count'}>
            Всего новостей: {data.length}
          </strong>
        ) : null}
      </div>
    )
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired,
}

class Add extends React.Component {
  state = {
    name: '',
    text: '',
    bigText: '',
    agree: false,
  }
  onBtnClickHandler = e => {
    e.preventDefault()
    const { name, text, bigText } = this.state
    this.props.onAddNews({
      id: +new Date(),
      author: name,
      text,
      bigText,
    })
  }
  handleChange = e => {
    const { id, value } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }
  handleCheckboxChange = e => {
    this.setState({ agree: e.currentTarget.checked })
  }
  validate = () => {
    const { name, text, agree } = this.state
    if (name.trim() && text.trim() && agree) {
      return true
    }
    return false
  }
  render() {
    const { name, text, bigText, agree } = this.state
    return (
      <form className="add">
        <input
          id="name"
          type="text"
          onChange={this.handleChange}
          className="add__author"
          placeholder="Ваше имя"
          value={name}
        />
        <textarea
          id="text"
          onChange={this.handleChange}
          className="add__text"
          placeholder="Текст новости"
          value={text}
        />
        <textarea
          id="bigText"
          onChange={this.handleChange}
          className="add__text"
          placeholder="Текст новости подробно"
          value={bigText}
        />
        <label className="add__checkrule">
          <input type="checkbox" onChange={this.handleCheckboxChange} /> Я
          согласен с правилами
        </label>
        <button
          className="add__btn"
          onClick={this.onBtnClickHandler}
          disabled={!this.validate()}
        >
          Показать alert
        </button>
      </form>
    )
  }
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired,
}

class App extends React.Component {
  state = {
    news: myNews,
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        <News data={this.state.news} />
      </React.Fragment>
    )
  }
}

export default App
